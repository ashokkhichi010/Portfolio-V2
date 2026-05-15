import React from 'react';

export default function SkillsMobileDrawer({ activeSkill, isDrawerOpen, setIsDrawerOpen }) {
  const drawerStyle = activeSkill ? {
    '--skill-bg': activeSkill.bg,
  } : undefined

  return (
    <div className={`skills-mobile-drawer lg:hidden ${isDrawerOpen ? 'open' : ''}`}>
      <div className="drawer-overlay" onClick={() => setIsDrawerOpen(false)}></div>
      <div className="drawer-content" style={{ position: 'absolute', overflow: 'hidden', ...drawerStyle }}>
        <div className="drawer-handle" onClick={() => setIsDrawerOpen(false)} style={{ position: 'relative', zIndex: 10 }}></div>
        {activeSkill && (
          <>
            <div className="code-description" style={{ position: 'relative', zIndex: 10 }}>
              <div className="flex justify-between items-start mb-6">
                <p className="code-title m-0">
                  {activeSkill.name.toUpperCase()}
                </p>
              </div>
              <div className="desc-block">
                <p className="desc-label">Duration:</p>
                <p className="desc-value">{activeSkill.duration}</p>
              </div>
              <div className="desc-block">
                <p className="desc-label">Experience:</p>
                <p className="desc-value">{activeSkill.experience}</p>
              </div>
            </div>
            {/* Background icon with opacity fixed */}
            <div style={{ position: 'absolute', right: '-2rem', bottom: '-2rem', width: '16rem', height: '16rem', pointerEvents: 'none', zIndex: 0 }}>
              <div style={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${activeSkill.icon})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                opacity: 0.6
              }} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
