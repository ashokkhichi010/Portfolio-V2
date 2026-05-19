import React, { memo } from 'react';

const JourneyItem = ({ data, style }) => {
  return (
    <div className="journey-item-container" style={style}>
      <div className="journey-card premium-card">
        {/* Glow effect behind the card content */}
        <div className="card-glow"></div>
        
        <div className="card-content">
          <div className="card-header">
            <span className="card-year">{data.year}</span>
            <div className="card-badge">MILESTONE {data.id}</div>
          </div>
          
          <h2 className="card-title">{data.title}</h2>
          <div className="card-divider"></div>
          <p className="card-desc">{data.description}</p>
          
          <div className="card-footer">
            <div className="status-indicator">
              <span className="dot pulse"></span>
              <span>ACHIEVED</span>
            </div>
          </div>
        </div>
        
        {/* Large subtle watermark in background */}
        <div className="card-watermark">{data.year}</div>
      </div>
    </div>
  );
};

export default memo(JourneyItem);
