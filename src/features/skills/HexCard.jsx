import React from 'react';

export default function HexCard({ skill, hexW, hexH, animDelay, onHover, onClick }) {
  const titleSize = Math.max(10, Math.round(hexW * 0.113));
  const subSize = Math.max(8, Math.round(hexW * 0.073));
  const captionPb = Math.round(hexH * 0.185);

  const bgColor = skill.bg;

  return (
    <div
      className="hex-item"
      style={{ width: hexW, height: hexH, animationDelay: `${animDelay}s` }}
      tabIndex={0}
      role="button"
      aria-label={`${skill.name} — ${skill.category}`}
      onMouseEnter={() => onHover(skill)}
      onFocus={() => onHover(skill)}
      onClick={() => {
        if (window.innerWidth < 1024) {
          onClick(skill);
        }
      }}
    >
      <div className="hex-focus-ring" aria-hidden="true" />
      <div className="hex-shape" style={{ backgroundColor: bgColor }}>
        <div className="hex-icon">
          <img src={skill.icon} alt={skill.name} loading="lazy" decoding="async" />
        </div>
        <div className="hex-caption" style={{ padding: `0 8px ${captionPb}px` }}>
          <h3 style={{ fontSize: titleSize }}>{skill.name}</h3>
          <p style={{ fontSize: subSize }}>{skill.category}</p>
        </div>
      </div>
    </div>
  );
}
