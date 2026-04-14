// tests/reactor.test.js
// Run: node tests/reactor.test.js (from project root)

import { REACTOR_CONFIG } from '../js/config.js';
import { ReactorSimulation } from '../js/reactor-simulation.js';

// ---- minimal harness ----
let passed = 0, failed = 0;
function assert(condition, message) {
    if (condition) { console.log('  PASS:', message); passed++; }
    else           { console.error('  FAIL:', message); failed++; }
}
function describe(label, fn) { console.log('\n' + label); fn(); }

// Set global config for simulation (it might expect it)
globalThis.REACTOR_CONFIG = REACTOR_CONFIG;

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

describe('Physics: Power vs Rods', () => {
    const sim = new ReactorSimulation();
    sim.start();
    
    // Inserir barras deve reduzir potência
    sim.controlRodsPosition = 50;
    sim.reactorPower = 50;
    sim.setControlRods(100); // Inserção total
    
    for(let i=0; i<10; i++) sim.tick(1000);
    assert(sim.reactorPower < 50, 'power decreases when rods are inserted');
    
    // Retirar barras deve aumentar potência
    sim.setControlRods(0);
    for(let i=0; i<20; i++) sim.tick(1000);
    assert(sim.reactorPower > 10, 'power increases when rods are removed');
});

describe('Safety: SCRAM (AZ-5)', () => {
    const sim = new ReactorSimulation();
    sim.start();
    sim.reactorPower = 100;
    sim.activateSCRAM();
    
    assert(sim.scramActive === true, 'scram flag active');
    assert(sim.controlRodsPosition === 100, 'rods fully inserted');
    
    sim.tick(1000);
    assert(sim.reactorPower < 100, 'power drops rapidly after scram');
});

// Final report
console.log(`\nTests finished: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
