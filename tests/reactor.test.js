// tests/reactor.test.js
// Run: node tests/reactor.test.js (from project root)

const fs = require('fs');
const path = require('path');
const vm = require('vm');

// config.js uses `var REACTOR_CONFIG`; load it safely in an isolated context.
const configCode = fs.readFileSync(path.join(__dirname, '../js/config.js'), 'utf8');
const configContext = { console };
vm.createContext(configContext);
vm.runInContext(configCode, configContext, { filename: 'config.js' });
global.REACTOR_CONFIG = configContext.REACTOR_CONFIG;

// reactor-simulation.js already has a module.exports guard at the bottom,
// so require() works directly.
const ReactorSimulation = require('../js/reactor-simulation.js');

// ---- minimal harness ----
let passed = 0, failed = 0;
function assert(condition, message) {
    if (condition) { console.log('  PASS:', message); passed++; }
    else           { console.error('  FAIL:', message); failed++; }
}
function describe(label, fn) { console.log('\n' + label); fn(); }

// ---- tests ----
describe('Initial state', () => {
    const sim = new ReactorSimulation();
    assert(sim.coreTemperature === REACTOR_CONFIG.initial.coreTemperature, 'temperature from config');
    assert(sim.running === false, 'not running before start()');
    assert(sim.eventsEnabled === false, 'events disabled in grace period');
    assert(sim.alerts.length === 0, 'no alerts at start');
});

describe('start()', () => {
    const sim = new ReactorSimulation();
    sim.start();
    assert(sim.running === true, 'running after start()');
    assert(sim.events.length > 0, 'startup events logged');
});

describe('setControlRods() clamping', () => {
    const sim = new ReactorSimulation();
    sim.setControlRods(150);
    assert(sim.controlRodsPosition === 100, 'clamped to 100 when above max');
    sim.setControlRods(-10);
    assert(sim.controlRodsPosition === 0, 'clamped to 0 when below min');
    sim.setControlRods(50);
    assert(sim.controlRodsPosition === 50, 'accepts value in range');
});

describe('setMainPump() clamping', () => {
    const sim = new ReactorSimulation();
    sim.setMainPump(200);
    assert(sim.mainPumpSpeed === 100, 'pump clamped to 100');
    sim.setMainPump(-5);
    assert(sim.mainPumpSpeed === 0, 'pump clamped to 0');
});

describe('tick() advances time', () => {
    const sim = new ReactorSimulation();
    sim.start();
    sim.tick(1000);
    assert(sim.time === 1000, 'time advances by deltaTime');
    assert(sim.ticks === 1, 'ticks increments');
});

describe('onUpdate callback fires on tick', () => {
    const sim = new ReactorSimulation();
    sim.start();
    let callCount = 0, lastState = null;
    sim.onUpdate = state => { callCount++; lastState = state; };
    sim.tick(1000);
    assert(callCount === 1, 'onUpdate called once per tick');
    assert(lastState !== null, 'onUpdate receives state object');
    assert('coreTemperature' in lastState, 'state has coreTemperature');
    assert('reactorPower' in lastState, 'state has reactorPower');
});

describe('activateSCRAM()', () => {
    const sim = new ReactorSimulation();
    sim.start();
    sim.activateSCRAM();
    assert(sim.scramActive === true, 'scramActive is true');
    assert(sim.controlRodsPosition === 100, 'rods inserted 100%');
    assert(sim.emergencyCoolingActive === true, 'emergency cooling on');
});

describe('SCRAM reduces power over ticks', () => {
    const sim = new ReactorSimulation();
    sim.start();
    sim.setControlRods(0);
    for (let i = 0; i < 10; i++) sim.tick(1000);
    const powerBefore = sim.reactorPower;
    sim.activateSCRAM();
    for (let i = 0; i < 5; i++) sim.tick(1000);
    assert(sim.reactorPower < powerBefore, 'power drops after SCRAM');
});

describe('applyExternalPressureShock()', () => {
    const sim = new ReactorSimulation();
    const before = sim.pressure;
    sim.applyExternalPressureShock(2);
    assert(Math.abs(sim.pressure - (before + 2)) < 0.001, 'pressure increases by delta');
    sim.pressure = 24;
    sim.applyExternalPressureShock(5);
    assert(sim.pressure === REACTOR_CONFIG.physics.pressureMax, 'pressure clamped at max');
});

describe('alert deduplication', () => {
    const sim = new ReactorSimulation();
    sim.start();
    sim.addAlert('warning', 'dup-test');
    sim.addAlert('warning', 'dup-test');
    const count = sim.alerts.filter(a => a.message === 'dup-test').length;
    assert(count === 1, 'duplicate alerts deduplicated');
});

describe('getState() shape', () => {
    const sim = new ReactorSimulation();
    sim.start();
    sim.tick(1000);
    const state = sim.getState();
    ['coreTemperature','pressure','radiationLevel','reactorPower',
     'controlRodsPosition','mainPumpSpeed','emergencyCoolingActive',
     'gridConnected','scramActive','time','gracePeriodActive'].forEach(key => {
        assert(key in state, `state has key: ${key}`);
    });
});

// ---- DemandSystem tests ----
// Load DemandSystem
const demandCode = fs.readFileSync(path.join(__dirname, '../js/demand-system.js'), 'utf8');
const demandContext = { console, module: { exports: {} }, Math };
vm.createContext(demandContext);
vm.runInContext(demandCode, demandContext, { filename: 'demand-system.js' });
const DemandSystem = demandContext.module.exports;

function makeMockSim(overrides) {
    return Object.assign({
        running: true,
        eventsEnabled: true,
        time: 200000,
        energyGeneration: 800
    }, overrides);
}

describe('DemandSystem: estado inicial', () => {
    const ds = new DemandSystem(makeMockSim());
    assert(ds.getQuota() === 300, 'cota inicial é 300 MW');
    assert(ds.warningStage === 0, 'sem avisos no início');
    assert(ds.firedEventIds.length === 0, 'nenhum evento disparado');
});

describe('DemandSystem: sem deficiência quando acima da cota', () => {
    const sim = makeMockSim({ energyGeneration: 800, time: 0 });
    const ds = new DemandSystem(sim);
    sim.time = 60000;
    ds._checkDeficiency();
    assert(ds.deficiencyStart === null, 'sem deficiência quando energia > cota');
    assert(ds.warningStage === 0, 'stage permanece 0');
});

describe('DemandSystem: telegrama 1 após 30s de deficiência', () => {
    const sim = makeMockSim({ energyGeneration: 200, time: 0 });
    const ds = new DemandSystem(sim);
    let telexStage = null;
    ds.onShowTelex = (stage) => { telexStage = stage; };

    // Simula 29s abaixo da cota — não deve disparar
    ds.deficiencyStart = 0;
    sim.time = 29000;
    ds._checkDeficiency();
    assert(telexStage === null, 'sem telegrama antes de 30s');
    assert(ds.warningStage === 0, 'stage 0 com menos de 30s');

    // Simula 31s — deve disparar
    sim.time = 31000;
    ds._checkDeficiency();
    assert(telexStage === 1, 'telegrama 1 disparado após 30s');
    assert(ds.warningStage === 1, 'stage avança para 1');
});

describe('DemandSystem: telegrama 2 após 150s', () => {
    const sim = makeMockSim({ energyGeneration: 200, time: 0 });
    const ds = new DemandSystem(sim);
    let lastStage = null;
    ds.onShowTelex = (stage) => { lastStage = stage; };

    ds.deficiencyStart = 0;
    sim.time = 31000;
    ds._checkDeficiency(); // stage → 1

    sim.time = 151000; // 30 + 121 > 150
    ds._checkDeficiency();
    assert(lastStage === 2, 'telegrama 2 disparado após 150s');
    assert(ds.warningStage === 2, 'stage avança para 2');
});

describe('DemandSystem: game over após 240s', () => {
    const sim = makeMockSim({ energyGeneration: 200, time: 0 });
    const ds = new DemandSystem(sim);
    ds.onShowTelex = () => {};
    let gameOverStats = null;
    ds.onGameOver = (stats) => { gameOverStats = stats; };

    ds.deficiencyStart = 0;
    sim.time = 31000;  ds._checkDeficiency(); // → stage 1
    sim.time = 151000; ds._checkDeficiency(); // → stage 2
    sim.time = 241000; ds._checkDeficiency(); // → stage 3 / game over
    assert(gameOverStats !== null, 'onGameOver chamado após 240s');
    assert(gameOverStats.quota === 300, 'stats contém cota');
    assert(gameOverStats.energy === 200, 'stats contém energia');
    assert(ds.warningStage === 3, 'stage 3 após game over');
});

describe('DemandSystem: reset ao recuperar energia (antes de stage 2)', () => {
    const sim = makeMockSim({ energyGeneration: 200, time: 0 });
    const ds = new DemandSystem(sim);
    let fired = false;
    ds.onShowTelex = () => { fired = true; };

    ds.deficiencyStart = 0;
    sim.time = 31000;
    ds._checkDeficiency(); // → stage 1

    // Volta acima da cota
    sim.energyGeneration = 800;
    ds._checkDeficiency();
    assert(ds.warningStage === 0, 'stage resetado ao recuperar energia em stage 1');
    assert(ds.deficiencyStart === null, 'deficiencyStart resetado');
});

describe('DemandSystem: _tryDemandEvent dispara e aumenta cota', () => {
    const sim = makeMockSim({ energyGeneration: 800, time: 200000 });
    const ds = new DemandSystem(sim);
    ds.lastDemandTime = 0; // sem cooldown
    let telexCalled = false;
    ds.onShowTelex = () => { telexCalled = true; };

    // Força disparo — sobrescreve Math.random para retornar 0 (sempre < 0.003)
    const origRandom = Math.random;
    Math.random = () => 0;
    ds._tryDemandEvent();
    Math.random = origRandom;

    assert(ds.currentQuota > 300, 'cota aumentou após evento de demanda');
    assert(ds.firedEventIds.length === 1, 'evento registrado como disparado');
    assert(telexCalled, 'telex chamado com stage 0');
});

describe('DemandSystem: stage 2 é ponto sem retorno', () => {
    const sim = makeMockSim({ energyGeneration: 200, time: 0 });
    const ds = new DemandSystem(sim);
    ds.onShowTelex = () => {};
    let gameOverCalled = false;
    ds.onGameOver = () => { gameOverCalled = true; };

    // Avança até stage 2
    ds.deficiencyStart = 0;
    sim.time = 31000;  ds._checkDeficiency(); // → stage 1
    sim.time = 151000; ds._checkDeficiency(); // → stage 2

    // Recupera energia
    sim.energyGeneration = 800;
    ds._checkDeficiency(); // stage 2 — NÃO reseta
    assert(ds.warningStage === 2, 'stage 2 não reseta ao recuperar energia');
    assert(ds.deficiencyStart === 0, 'deficiencyStart mantido em stage 2');

    // Countdown continua — jogo over em 240s (energia volta a ser deficiente)
    sim.energyGeneration = 200;
    sim.time = 241000;
    ds._checkDeficiency();
    assert(gameOverCalled === true, 'game over dispara mesmo após recuperação em stage 2');
});

// ---- summary ----
console.log(`\n${'='.repeat(40)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
