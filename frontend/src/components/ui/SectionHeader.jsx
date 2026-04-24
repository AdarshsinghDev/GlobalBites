import React from 'react';

const SectionHeader = ({ eyebrow, title, subtitle, center = false }) => {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', maxWidth: 560, margin: center ? '0 auto 40px' : '0 0 40px' }}>
      <div className="text-label" style={{ marginBottom: 8 }}>{eyebrow}</div>
      <h2 className="text-h2" style={{ marginBottom: 12 }}>{title}</h2>
      <p style={{ color: 'var(--text-secondary)' }}>{subtitle}</p>
    </div>
  );
};

export default SectionHeader;
