import React from 'react';

interface ConsoleLogProps {
  lines: string[];
  interval?: number; // ms between lines
  autoStart?: boolean;
  height?: number | string;
}

export const ConsoleLog: React.FC<ConsoleLogProps> = ({ lines, interval = 900, autoStart = true, height = 180 }) => {
  const [visible, setVisible] = React.useState<string[]>([]);
  const [running, setRunning] = React.useState(autoStart);

  React.useEffect(() => {
    setVisible([]);
    if (!running) return;
    let i = 0;
    const t = setInterval(() => {
      setVisible(v => [...v, lines[i]]);
      i += 1;
      if (i >= lines.length) {
        clearInterval(t);
        setRunning(false);
      }
    }, interval);
    return () => clearInterval(t);
  }, [lines, interval, running]);

  return (
    <div style={{
      background: '#000',
      color: '#00ff6a',
      fontFamily: 'Menlo, Monaco, monospace',
      fontSize: 13,
      padding: 12,
      borderRadius: 6,
      border: '1px solid rgba(0,255,106,0.12)',
      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.6)',
      height,
      overflowY: 'auto'
    }}>
      <div style={{ opacity: 0.9 }}>
        {visible.map((l, idx) => (
          <div key={idx} style={{ whiteSpace: 'pre-wrap', lineHeight: '1.35' }}>{l}</div>
        ))}
        {running && (
          <div style={{ display: 'inline-block', marginTop: 4 }}>_</div>
        )}
      </div>
    </div>
  );
};

export default ConsoleLog;
