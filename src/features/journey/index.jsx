import React, { useState, useEffect, useRef, useMemo } from 'react';
import JourneyHUD from './HUD';
import JourneyItem from './Item';
import journeyDataRaw from '../../data/journey.json';
const journeyData = journeyDataRaw;
import './styles.css';

const CONFIG = {
  itemCount: journeyData.length,
  zGap: 1000,
  camSpeed: 3.5,
  baseFov: 1000,
  hudUpdateInterval: 120
};
CONFIG.loopSize = CONFIG.itemCount * CONFIG.zGap;

const JourneySection = () => {
  const containerRef = useRef(null);
  const worldRef = useRef(null);
  const viewportRef = useRef(null);
  const rafRef = useRef(null);
  const lastHudUpdateRef = useRef(0);

  // State managed via refs for performance (RAF loop)
  const state = useRef({
    scroll: 0,
    velocity: 0,
    targetSpeed: 0,
    mouseX: 0,
    mouseY: 0,
    fps: 60,
    lastTime: 0,
    cameraZ: 0
  });

  const [hudData, setHudData] = useState({ scroll: 0, velocity: 0, fps: 60 });
  const hudSnapshotRef = useRef(hudData);

  useEffect(() => {
    hudSnapshotRef.current = hudData;
  }, [hudData]);

  // Initialize Items
  const items = useMemo(() => {
    const arr = [];

    // Process Journey Data
    journeyData.forEach((data, i) => {
      const angle = (i / CONFIG.itemCount) * Math.PI * 4; // Spiral
      const x = Math.cos(angle) * (window.innerWidth * 0.25);
      const y = Math.sin(angle) * (window.innerHeight * 0.2);
      const rot = (Math.random() - 0.5) * 20;

      arr.push({
        data,
        type: data.type === 'HEADING' ? 'text' : 'card',
        x, y, rot,
        baseZ: -i * CONFIG.zGap,
        id: `item-${i}`
      });
    });

    return arr;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      state.current.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      state.current.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrolled = -rect.top;
      const velocity = scrolled - state.current.scroll;

      state.current.scroll = scrolled;
      state.current.targetSpeed = velocity;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    const update = (time) => {
      const s = state.current;
      const delta = time - s.lastTime;
      s.lastTime = time;

      // FPS Calculation
      if (time % 10 < 1) {
        s.fps = Math.round(1000 / delta) || 60;
      }

      // Smooth Velocity
      s.velocity += (s.targetSpeed - s.velocity) * 0.1;
      s.targetSpeed *= 0.95; // Friction

      const shouldSyncHud =
        time - lastHudUpdateRef.current >= CONFIG.hudUpdateInterval &&
        (
          Math.abs(s.velocity) > 0.01 ||
          Math.abs(s.scroll - hudSnapshotRef.current.scroll) > 24 ||
          Math.abs(s.fps - hudSnapshotRef.current.fps) > 0
        );

      if (shouldSyncHud) {
        lastHudUpdateRef.current = time;
        setHudData({ scroll: s.scroll, velocity: s.velocity, fps: s.fps });
      }

      // Camera Z
      s.cameraZ = s.scroll * CONFIG.camSpeed;

      // Render World
      if (worldRef.current && viewportRef.current) {
        const tiltX = s.mouseY * 5 - s.velocity * 0.3;
        const tiltY = s.mouseX * 5;
        worldRef.current.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

        const fov = CONFIG.baseFov - Math.min(Math.abs(s.velocity) * 8, 500);
        viewportRef.current.style.perspective = `${fov}px`;
      }

      // Render Items (Direct DOM manipulation for performance)
      items.forEach((item, i) => {
        const el = document.getElementById(item.id);
        if (!el) return;

        let relZ = item.baseZ + s.cameraZ;
        const modC = CONFIG.loopSize;
        let vizZ = ((relZ % modC) + modC) % modC;
        if (vizZ > 500) vizZ -= modC;

        let alpha = 1;
        if (vizZ < -3500) alpha = 0;
        else if (vizZ < -2500) alpha = (vizZ + 3500) / 1000;
        if (vizZ > 100) alpha = 1 - ((vizZ - 100) / 400);
        if (alpha < 0) alpha = 0;

        el.style.opacity = alpha;

        if (alpha > 0) {
          let trans = `translate3d(${item.x}px, ${item.y}px, ${vizZ}px)`;

          if (item.type === 'text') {
            trans += ` rotateZ(${item.rot}deg)`;
            if (Math.abs(s.velocity) > 2) {
              const offset = s.velocity * 1.5;
              el.style.textShadow = `${offset}px 0 rgba(255,0,0,0.5), ${-offset}px 0 rgba(0,255,255,0.5)`;
            } else {
              el.style.textShadow = 'none';
            }
          } else {
            const t = time * 0.001;
            const float = Math.sin(t + i) * 5;
            trans += ` rotateZ(${item.rot}deg) rotateY(${float}deg)`;
          }
          el.style.transform = trans;
        }
      });

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [items]);

  return (
    <section id="journey" className="journey-section" ref={containerRef} style={{ height: `${CONFIG.loopSize / 3}px` }}>
      <div className="journey-sticky">
        <JourneyHUD {...hudData} />

        <div className="journey-viewport" ref={viewportRef}>
          <div className="journey-world" ref={worldRef}>
            {items.map((item, idx) => (
              <div key={item.id} id={item.id} className="journey-item-wrapper">
                <JourneyItem data={item.data} type={item.data.type} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
