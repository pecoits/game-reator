import React from 'react';

type GaugeProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  color: string;
};

function Gauge({ label, value, min, max, unit, color }: GaugeProps) {
  const ratio = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const angle = -130 + ratio * 260;

  return (
    <div style={styles.gaugeCard}>
      <div style={styles.gaugeLabel}>{label}</div>
      <div style={styles.gaugeShell}>
        <div style={styles.gaugeFace}>
          <div style={{ ...styles.gaugeNeedle, transform: `translate(-50%, -100%) rotate(${angle}deg)` }} />
          <div style={styles.gaugeCenter} />
          <div style={{ ...styles.gaugeArc, borderColor: color }} />
        </div>
      </div>
      <div style={styles.gaugeReadout}>
        <span>{value.toFixed(1)}</span>
        <small>{unit}</small>
      </div>
    </div>
  );
}

function SevenSegment({ label, value, tone }: { label: string; value: string; tone: 'green' | 'yellow' | 'red' }) {
  const toneStyles = {
    green: { color: '#64ff8f', textShadow: '0 0 8px #64ff8f, 0 0 18px #64ff8f' },
    yellow: { color: '#ffe066', textShadow: '0 0 8px #ffe066, 0 0 18px #ffe066' },
    red: { color: '#ff6b6b', textShadow: '0 0 8px #ff6b6b, 0 0 18px #ff6b6b' },
  }[tone];

  return (
    <div style={styles.segmentCard}>
      <div style={styles.segmentLabel}>{label}</div>
      <div style={styles.segmentFrame}>
        <div style={{ ...styles.segmentDigits, ...toneStyles }}>{value}</div>
      </div>
    </div>
  );
}

function Toggle({ label, active }: { label: string; active: boolean }) {
  return (
    <div style={styles.toggleRow}>
      <div style={styles.toggleLabel}>{label}</div>
      <div style={{ ...styles.toggleSwitch, justifyContent: active ? 'flex-end' : 'flex-start' }}>
        <div style={{ ...styles.toggleKnob, background: active ? '#9bff83' : '#9aa0a6' }} />
      </div>
    </div>
  );
}

export default function ControlRoomConceptCanvas() {
  return (
    <div style={styles.page}>
      <div style={styles.titleBar}>
        <div style={styles.title}>SALA DE CONTROLE - CONCEITO IMERSIVO</div>
        <div style={styles.subtitle}>RBMK-1000 / painel analógico + digital estilo usina real</div>
      </div>

      <div style={styles.mainGrid}>
        <div style={styles.leftPanel}>
          <h3 style={styles.panelHeading}>MOSTRADORES ANALOGICOS</h3>
          <div style={styles.gaugeGrid}>
            <Gauge label="TEMP. NUCLEO" value={287.3} min={0} max={450} unit="C" color="#ffb347" />
            <Gauge label="PRESSAO" value={15.8} min={0} max={25} unit="MPa" color="#68d5ff" />
            <Gauge label="POTENCIA" value={74.0} min={0} max={110} unit="%" color="#c9ff62" />
            <Gauge label="RADIACAO" value={0.24} min={0} max={20} unit="mSv/h" color="#ff6b6b" />
          </div>
        </div>

        <div style={styles.centerPanel}>
          <h3 style={styles.panelHeading}>DISPLAY DIGITAL 7 SEGMENTOS</h3>
          <div style={styles.segmentGrid}>
            <SevenSegment label="REATOR" value="074.0" tone="green" />
            <SevenSegment label="PRESSAO" value="15.8" tone="yellow" />
            <SevenSegment label="TEMP" value="287.3" tone="yellow" />
            <SevenSegment label="ALARME" value="0001" tone="red" />
          </div>

          <div style={styles.annunciatorRow}>
            <div style={{ ...styles.lamp, background: '#64ff8f' }}>NORMA</div>
            <div style={{ ...styles.lamp, background: '#ffe066' }}>ATENCAO</div>
            <div style={{ ...styles.lamp, background: '#ff6b6b' }}>PERIGO</div>
            <div style={{ ...styles.lamp, background: '#ff3b3b' }}>SCRAM</div>
          </div>
        </div>

        <div style={styles.rightPanel}>
          <h3 style={styles.panelHeading}>CONTROLES E CHAVES</h3>
          <Toggle label="BOMBA PRINCIPAL" active />
          <Toggle label="BOMBA AUXILIAR" active={false} />
          <Toggle label="COOLING EMERGENCIA" active={false} />
          <Toggle label="CONECTADO A REDE" active />

          <div style={styles.buttonCluster}>
            <button style={styles.safeButton}>RESET ALARMES</button>
            <button style={styles.warnButton}>ISOLAR REDE</button>
            <button style={styles.scramButton}>AZ-5 / SCRAM</button>
          </div>
        </div>
      </div>

      <div style={styles.footer}>
        Direcao visual: metal escuro, desgaste leve, glow nos LEDs, tipografia tecnica e ruido de fundo para "sala viva".
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
    background: 'linear-gradient(180deg, #1e2429 0%, #14181c 100%)',
    color: '#e8eef2',
    padding: 20,
    minHeight: '100vh',
  },
  titleBar: {
    border: '1px solid #3a454f',
    borderRadius: 10,
    padding: 14,
    background: '#252e36',
    marginBottom: 14,
  },
  title: { fontWeight: 700, letterSpacing: 1.1 },
  subtitle: { fontSize: 13, opacity: 0.85, marginTop: 4 },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr 0.9fr',
    gap: 14,
  },
  leftPanel: {
    background: '#232b33',
    border: '1px solid #3c4a56',
    borderRadius: 12,
    padding: 12,
  },
  centerPanel: {
    background: '#202831',
    border: '1px solid #3b4752',
    borderRadius: 12,
    padding: 12,
  },
  rightPanel: {
    background: '#202830',
    border: '1px solid #394652',
    borderRadius: 12,
    padding: 12,
  },
  panelHeading: {
    margin: '0 0 10px 0',
    fontSize: 13,
    letterSpacing: 1,
    opacity: 0.9,
  },
  gaugeGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10,
  },
  gaugeCard: {
    background: '#161d23',
    border: '1px solid #38444f',
    borderRadius: 10,
    padding: 8,
  },
  gaugeLabel: { fontSize: 11, opacity: 0.88, marginBottom: 6 },
  gaugeShell: { display: 'flex', justifyContent: 'center' },
  gaugeFace: {
    width: 120,
    height: 120,
    borderRadius: '50%',
    background: 'radial-gradient(circle at 45% 35%, #32404d 0%, #171d22 68%)',
    position: 'relative',
    border: '2px solid #4b5966',
  },
  gaugeNeedle: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: 3,
    height: 42,
    transformOrigin: '50% 100%',
    background: '#f5f7fa',
    borderRadius: 2,
  },
  gaugeCenter: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 10,
    height: 10,
    borderRadius: '50%',
    background: '#dce3ea',
  },
  gaugeArc: {
    position: 'absolute',
    inset: 6,
    borderRadius: '50%',
    border: '2px solid',
    clipPath: 'polygon(0 57%, 0 100%, 100% 100%, 100% 57%, 50% 0)',
    opacity: 0.75,
  },
  gaugeReadout: {
    marginTop: 6,
    display: 'flex',
    alignItems: 'baseline',
    gap: 6,
    fontWeight: 600,
    justifyContent: 'center',
  },
  segmentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10,
  },
  segmentCard: {
    background: '#11181e',
    border: '1px solid #36424d',
    borderRadius: 10,
    padding: 8,
  },
  segmentLabel: { fontSize: 11, opacity: 0.85, marginBottom: 6 },
  segmentFrame: {
    borderRadius: 6,
    border: '1px solid #40505c',
    background: '#0a1115',
    padding: '10px 8px',
  },
  segmentDigits: {
    fontFamily: '"Courier New", monospace',
    letterSpacing: 2,
    fontWeight: 700,
    fontSize: 28,
    textAlign: 'center',
  },
  annunciatorRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 8,
    marginTop: 10,
  },
  lamp: {
    color: '#121212',
    fontWeight: 700,
    textAlign: 'center',
    padding: '8px 6px',
    borderRadius: 8,
    border: '1px solid rgba(0,0,0,0.35)',
  },
  toggleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 8,
  },
  toggleLabel: { fontSize: 12, opacity: 0.95 },
  toggleSwitch: {
    width: 54,
    height: 26,
    background: '#151d23',
    border: '1px solid #42515f',
    borderRadius: 999,
    display: 'flex',
    alignItems: 'center',
    padding: 2,
  },
  toggleKnob: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    boxShadow: '0 0 12px rgba(140,255,130,0.5)',
  },
  buttonCluster: { marginTop: 14, display: 'grid', gap: 8 },
  safeButton: {
    background: '#2b3d2f',
    color: '#bfffc0',
    border: '1px solid #4e8a58',
    borderRadius: 8,
    padding: '10px 12px',
    cursor: 'pointer',
  },
  warnButton: {
    background: '#4a3f2d',
    color: '#ffe5a6',
    border: '1px solid #b99758',
    borderRadius: 8,
    padding: '10px 12px',
    cursor: 'pointer',
  },
  scramButton: {
    background: '#5a2323',
    color: '#ffb9b9',
    border: '1px solid #cf5c5c',
    borderRadius: 8,
    padding: '12px 12px',
    cursor: 'pointer',
    fontWeight: 700,
  },
  footer: {
    marginTop: 14,
    fontSize: 12,
    opacity: 0.8,
    borderTop: '1px dashed #4a5a66',
    paddingTop: 10,
  },
};
