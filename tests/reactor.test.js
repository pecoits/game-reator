// tests/reactor.test.js
// Run: node tests/reactor.test.js (from project root)

const fs = require('fs');
const path = require('path');

// config.js uses `var REACTOR_CONFIG` — eval it then expose on global so
// reactor-simulation.js (loaded via require) can find it at construction time.
eval(fs.readFileSync(path.join(__dirname, '../js/config.js'), 'utf8'));
// eslint-disable-next-line no-undef
global.REACTOR_CONFIG = REACTOR_CONFIG;

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

// ---- summary ----
console.log(`\n${'='.repeat(40)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
