import React, { memo } from 'react';

const JourneyHUD = ({ scroll, velocity, fps }) => {
  return (
    <>
      {/* Overlays */}
      <div className="journey-scanlines"></div>
      <div className="journey-vignette"></div>
      <div className="journey-noise"></div>

      {/* HUD Info */}
      <div className="journey-hud">
        <div className="hud-top">
          <span>SYS.JOURNEY // READY</span>
          <div className="hud-line"></div>
          <span>FPS: <strong>{fps}</strong></span>
        </div>

        <div className="center-nav">
          TIMELINE VELOCITY // <strong>{Math.abs(velocity).toFixed(2)}</strong>
        </div>

        <div className="hud-bottom">
          <span>OFFSET: <strong>{scroll.toFixed(0)}PX</strong></span>
          <div className="hud-line"></div>
          <span>VER 2.1.0 [STABLE]</span>
        </div>
      </div>
    </>
  );
};

export default memo(JourneyHUD);
