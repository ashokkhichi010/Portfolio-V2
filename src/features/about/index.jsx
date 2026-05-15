import React, { useState, useRef, useEffect, useCallback } from 'react';
import LeftPage from './LeftPage';
import RightPage from './RightPage';
import CoverPage from './CoverPage';
import aboutData from '../../data/about.json';
import './styles.css';
import { MoveLeft, MoveUp, MousePointerClick } from 'lucide-react';

const MOBILE_BREAKPOINT = 1050;

const AboutSection = () => {
  const [flippedPages, setFlippedPages] = useState(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0); // which page card is visible
  const pagesRef = useRef(null);

  // ── Detect mobile ────────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── Sync CSS custom properties for the mobile slider ─────────────────────
  useEffect(() => {
    if (!pagesRef.current) return;
    pagesRef.current.style.setProperty('--total-pages', aboutData.length);
    pagesRef.current.style.setProperty('--active-index', mobileIndex);
  }, [mobileIndex, isMobile]);

  // ─────────────────────────────────────────────────────────────────────────
  // DESKTOP: 3-D book flip logic
  // ─────────────────────────────────────────────────────────────────────────
  const flipNext = (pageIndex) => {
    const newFlipped = new Set(flippedPages);
    newFlipped.add(aboutData[pageIndex].id);
    if (pageIndex + 1 < aboutData.length) newFlipped.add(aboutData[pageIndex + 1].id);
    setFlippedPages(newFlipped);
  };

  const flipPrev = (pageIndex) => {
    const newFlipped = new Set(flippedPages);
    newFlipped.delete(aboutData[pageIndex].id);
    if (pageIndex - 1 >= 0) newFlipped.delete(aboutData[pageIndex - 1].id);
    setFlippedPages(newFlipped);
  };

  const handlePageClick = (index) => {
    const isRightSide = index % 2 === 0;
    const isFlipped = flippedPages.has(aboutData[index].id);
    if (!isRightSide && isFlipped) flipPrev(index);
    else if (isRightSide && !isFlipped) flipNext(index);
  };

  const getZIndex = (index) => (index % 2 === 0 ? aboutData.length - index : 'auto');

  const isAtStart = isMobile ? (mobileIndex === 0) : (flippedPages.size === 0);
  const isAtEnd = isMobile ? (mobileIndex === aboutData.length - 1) : (flippedPages.size === aboutData.length);

  // ─────────────────────────────────────────────────────────────────────────
  // MOBILE: swipe + arrow nav
  // ─────────────────────────────────────────────────────────────────────────
  const touchStartX = useRef(0);

  const goTo = useCallback((idx) => {
    setMobileIndex(Math.max(0, Math.min(aboutData.length - 1, idx)));
  }, []);

  const handleTouchStart = (e) => { touchStartX.current = e.changedTouches[0].screenX; };
  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].screenX;
    if (Math.abs(diff) < 40) return;
    goTo(mobileIndex + (diff > 0 ? 1 : -1));
  };

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  const renderPageContent = (page) => {
    // if (page.type === 'cover') return <CoverPage data={page} />;
    if (page.type === 'left') return <LeftPage data={page} />;
    if (page.type === 'right') return <RightPage data={page} />;
    // if (page.type === 'back') return <CoverPage data={page} isBack />;
    return null;
  };

  return (
    <section id="about" className="about-section">
      <div
        className="about-book"
        onTouchStart={isMobile ? handleTouchStart : undefined}
        onTouchEnd={isMobile ? handleTouchEnd : undefined}
      >
        <div className="pages" ref={pagesRef}>

          {/* ── Outside Book Messages ── */}
          <div className={`book-intro-text ${isAtStart ? 'visible' : ''}`}>
            <p>
              {isMobile ? (
                <>
                  <MoveLeft className="hint-icon-x" size={48} />
                </>
              ) : (
                <>
                    <h2>WELCOME</h2>
                    <h3>to</h3>
                    <h3><u>short intro</u></h3>
                    <h2>ABOUT ME</h2>
                    <h6>Click on the cover page to start</h6>
                  <MousePointerClick className="hint-icon-pulse" size={48} />
                </>
              )}
            </p>
          </div>

          <div className={`book-outro-text ${isAtEnd ? 'visible' : ''}`}>
            <h2>Thank You</h2>
            <p>
              Scroll upwards to proceed
              <MoveUp className="hint-icon-y" size={48} />
            </p>
          </div>

          {aboutData.map((page, index) => {
            const isFlipped = flippedPages.has(page.id);
            const pageThemeClass = `page-theme-${page.type}`;

            return (
              <div
                key={page.id}
                className={`page ${isFlipped ? 'flipped' : ''} ${pageThemeClass}`}
                style={!isMobile ? { zIndex: getZIndex(index) } : undefined}
                onClick={!isMobile ? () => handlePageClick(index) : undefined}
              >
                {renderPageContent(page)}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;