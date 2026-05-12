import React from 'react';
import leftArrow from '../../assets/icons/left-arrow.svg';
import rightArrow from '../../assets/icons/right-arrow.svg';

const EducationNav = ({ onPrev, onNext }) => {
  return (
    <>
      <img
        src={leftArrow}
        className="prev"
        onClick={onPrev}
        alt="Previous"
      />
      <img
        src={rightArrow}
        className="next"
        onClick={onNext}
        alt="Next"
      />
    </>
  );
};

export default EducationNav;
