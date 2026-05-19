import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import educationDataRaw from '../../data/education.json';
const educationData = educationDataRaw;
import EducationSlide from './EducationSlide';
import EducationNav from './EducationNav';
import EducationTrail from './EducationTrail';
import './styles.css';
import SectionAnalytics from '../../components/SectionAnalytics';

const EducationSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const timerRef = useRef(null);
  const intervalTime = 5000;

  useEffect(() => {
    // GSAP context for automatic cleanup and selector scoping
    const ctx = gsap.context(() => {
      const activeSlide = `.slide-index-${activeIndex}`;
      const tl = gsap.timeline({ defaults: { duration: 0.7, ease: "power3.out" } });

      // Reset animations
      gsap.set(".animate-item", { opacity: 1, x: 0, y: 0, scale: 1 });
      gsap.set(".bg", { x: "0%", opacity: 1 });

      // Run active slide animations
      tl.from(`${activeSlide} .bg`, { x: "-100%", opacity: 0 })
        .from(`${activeSlide} .details .edu-period`, { opacity: 0, x: -30 }, "-=0.4")
        .from(`${activeSlide} .details h1`, { opacity: 0, y: 30 }, "-=0.3")
        .from(`${activeSlide} .details .edu-institution`, { opacity: 0, scale: 0.9 }, "-=0.2")
        .from(`${activeSlide} .details p`, { opacity: 0, y: 20 }, "-=0.3")
        .from(`${activeSlide} .illustration .inner`, { opacity: 0, scale: 0.8, rotateY: 30 }, "-=0.4");
    }, containerRef);

    startTimer();
    return () => {
      ctx.revert();
      clearInterval(timerRef.current);
    };
  }, [activeIndex]);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(nextSlide, intervalTime);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % educationData.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + educationData.length) % educationData.length);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <>
      <SectionAnalytics sectionId="education" sectionTitle="Education" />
      <section id="education" ref={containerRef}>
        {/* Section Heading Overlay */}
        <div className="section-header">
          <span className="section-number">05</span>
          <h2 className="section-title">&lt;Education /&gt;</h2>
        </div>

        <div className="container">
          <div
            className="slider"
            style={{
              transform: `translateX(-${activeIndex * 100}%)`
            }}
          >
            {educationData.map((edu, idx) => (
              <EducationSlide
                key={edu.id || idx}
                edu={edu}
                index={idx}
              />
            ))}
          </div>

          <EducationNav
            onPrev={prevSlide}
            onNext={nextSlide}
          />

          <EducationTrail
            data={educationData}
            activeIndex={activeIndex}
            onTrailClick={goToSlide}
          />
        </div>
      </section>
    </>
  );
};

export default EducationSection;
