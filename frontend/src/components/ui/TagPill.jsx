import React from 'react';

const TagPill = ({ children, tone = 'butter', className = '' }) => {
  const toneClass = tone === 'green' ? 'pill-green' : tone === 'neutral' ? 'pill-neutral' : '';
  return <span className={`pill ${toneClass} ${className}`.trim()}>{children}</span>;
};

export default TagPill;
