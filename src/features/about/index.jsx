import React, { useState, useRef, useEffect } from 'react';
import LeftPage from './LeftPage';
import RightPage from './RightPage';
import { aboutData } from './data';
import './styles.css';

const AboutSection = () => {
  // Track which pages are flipped by their ID
  const [flippedPages, setFlippedPages] = useState(new Set());
  const [mobileFocus, setMobileFocus] = useState('right'); // Starts on the cover (right side)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track focus for mobile view ('left' or 'right')

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Initialize z-indexes so the first page is on top
  const getZIndex = (index) => {
    if (index % 2 === 0) {
      return aboutData.length - index;
    }
    return 'auto';
  };

  const flipNext = (pageIndex) => {
    // pageIndex is the index in the array (0-based)
    // Next implies we are flipping a right page (odd child, even index) to the left
    const newFlipped = new Set(flippedPages);
    newFlipped.add(aboutData[pageIndex].id);
    if (pageIndex + 1 < aboutData.length) {
      newFlipped.add(aboutData[pageIndex + 1].id);
    }
    setFlippedPages(newFlipped);
  };

  const flipPrev = (pageIndex) => {
    // Prev implies we are un-flipping a left page (even child, odd index) to the right
    const newFlipped = new Set(flippedPages);
    newFlipped.delete(aboutData[pageIndex].id);
    if (pageIndex - 1 >= 0) {
      newFlipped.delete(aboutData[pageIndex - 1].id);
    }
    setFlippedPages(newFlipped);
  };

  const handlePageClick = (index) => {
    const isRightSide = index % 2 === 0; // In DOM, 1st element (index 0) is odd child (right side)
    const isFlipped = flippedPages.has(aboutData[index].id);

    if (!isRightSide && isFlipped) {
      // Clicked a left page that is currently flipped -> unflip it
      flipPrev(index);
      if (window.innerWidth <= 768) setMobileFocus('right');
    } else if (isRightSide && !isFlipped) {
      // Clicked a right page that is not flipped -> flip it
      flipNext(index);
      if (window.innerWidth <= 768) setMobileFocus('left');
    }
  };

  // Mobile Swipe Handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50; // Minimum distance to trigger swipe
    const diff = touchStartX.current - touchEndX.current;

    // Determine current visible spread based on flipped pages
    // The highest index flipped right page tells us where we are
    let highestFlippedRightIndex = -2; // -2 means cover is not flipped
    aboutData.forEach((page, index) => {
      if (index % 2 === 0 && flippedPages.has(page.id)) {
        highestFlippedRightIndex = index;
      }
    });

    if (diff > swipeThreshold) {
      // Swiped Left (Go Forward)
      if (mobileFocus === 'left') {
        setMobileFocus('right');
      } else {
        // Focus is right, so flip the current right page
        const rightPageIndex = highestFlippedRightIndex + 2;
        if (rightPageIndex < aboutData.length) {
          flipNext(rightPageIndex);
          setMobileFocus('left');
        }
      }
    } else if (diff < -swipeThreshold) {
      // Swiped Right (Go Backward)
      if (mobileFocus === 'right') {
        // If we are on the cover (index 0) and not flipped, we can't go back
        if (highestFlippedRightIndex >= 0) {
          setMobileFocus('left');
        }
      } else {
        // Focus is left, unflip the current left page
        const leftPageIndex = highestFlippedRightIndex + 1;
        if (leftPageIndex >= 0) {
          flipPrev(leftPageIndex);
          setMobileFocus('right');
        }
      }
    }
  };

  // Determine mobile class
  const getMobileClass = () => {
    if (flippedPages.size === 0) return 'focus-cover'; // Initial state
    if (flippedPages.size === aboutData.length) return 'focus-left'; // End state (back cover on left)
    return mobileFocus === 'left' ? 'focus-left' : 'focus-right';
  };

  const isAtStart = flippedPages.size === 0;
  const isAtEnd = flippedPages.size === aboutData.length;

  return (
    <section id="about" className="about-section">
      <div
        className="about-book"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className={`pages ${getMobileClass()}`}>

          {/* Outside Book Messages */}
          <div className={`book-intro-text ${isAtStart && !isMobile ? 'visible' : ''}`}>
            <h2>Welcome</h2>
            <p>Open the book to learn more about my journey.</p>
          </div>

          <div className={`book-outro-text ${isAtEnd && !isMobile ? 'visible' : ''}`}>
            <h2>Thank You</h2>
            <p>I appreciate you taking the time to read my story.</p>
          </div>
          {aboutData.map((page, index) => {
            const isFlipped = flippedPages.has(page.id);
            const zIndex = getZIndex(index);

            // Determine the page's color/style based on its type
            const pageThemeClass = `page-theme-${page.type}`;

            return (
              <div
                key={page.id}
                className={`page ${isFlipped ? 'flipped' : ''} ${pageThemeClass}`}
                style={{ zIndex: zIndex }}
                onClick={() => !isMobile && handlePageClick(index)}
              >
                {page.type === 'left' && <LeftPage data={page} />}
                {page.type === 'right' && <RightPage data={page} />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;