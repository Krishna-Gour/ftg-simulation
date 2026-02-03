import React from 'react';

interface TimelineBarProps {
  steps: string[];
  currentIndex: number;
}

export const TimelineBar: React.FC<TimelineBarProps> = ({ steps, currentIndex }) => {
  return (
    <div style={{ width: '100%', padding: '12px 16px 6px', boxSizing: 'border-box' }}>
      <div style={{ position: 'relative', padding: '8px 12px', overflowX: 'auto' }}>
        <div style={{ height: 6, background: '#0b1220', borderRadius: 6, position: 'absolute', left: 12, right: 12, top: 26 }} />

        <div style={{ display: 'flex', gap: 24, alignItems: 'center', position: 'relative', zIndex: 2 }}>
          {steps.map((label, idx) => {
            const status = idx < currentIndex ? 'done' : idx === currentIndex ? 'current' : 'pending';
            const bg = status === 'done' ? '#16a34a' : status === 'current' ? '#2563eb' : '#334155';
            const color = status === 'pending' ? '#94a3b8' : '#fff';

            return (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 120 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 14, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: status === 'current' ? '0 0 10px rgba(37,99,235,0.35)' : 'none'
                  }} />
                </div>
                <div style={{ marginTop: 8, fontSize: 11, fontWeight: 600, textAlign: 'center', color }}>{label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelineBar;
