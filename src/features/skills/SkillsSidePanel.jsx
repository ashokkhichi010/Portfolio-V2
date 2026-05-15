import { useState, useEffect } from 'react';

export default function SkillsSidePanel({ activeSkill }) {
  const [displayedSkill, setDisplayedSkill] = useState(activeSkill);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (activeSkill && (!displayedSkill || activeSkill.name !== displayedSkill.name)) {
      setIsFading(true);
      const timer = setTimeout(() => {
        setDisplayedSkill(activeSkill);
        setIsFading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [activeSkill, displayedSkill]);

  const skillToRender = isFading ? displayedSkill : activeSkill;
  const panelStyle = skillToRender ? {
    '--skill-bg': skillToRender.bg,
  } : undefined

  return (
    <div className="skills-side-panel">
      <div className="panel-content-wrap" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', ...panelStyle }}>
        {skillToRender ? (
          <>
            <div className={`code-description ${isFading ? 'fade-out' : 'fade-in'}`} style={{ position: 'relative', zIndex: 10 }}>
              <p className="code-title" style={{ transition: 'color 0.2s ease' }}>
                {skillToRender.name.toUpperCase()}
              </p>
              <div className="desc-block">
                <p className="desc-label">Duration:</p>
                <p className="desc-value">{skillToRender.duration}</p>
              </div>
              <div className="desc-block">
                <p className="desc-label">Experience:</p>
                <p className="desc-value">{skillToRender.experience}</p>
              </div>
            </div>
            {/* Wrapper handles fade-in animation, inner div handles the low opacity to prevent animation override */}
            <div
              className={isFading ? 'fade-out' : 'fade-in'}
              style={{ position: 'absolute', right: '-2rem', bottom: '-2rem', width: '22rem', height: '22rem', pointerEvents: 'none', zIndex: 0 }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${skillToRender.icon})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                opacity: 0.4
              }} />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
