import React from 'react';

const EducationTrail = ({ data, activeIndex, onTrailClick }) => {
  return (
    <div className="trail">
      {data.map((edu, idx) => (
        <div
          key={edu.id || idx}
          className={`${activeIndex === idx ? 'active' : ''}`}
          style={{ '--edu-color': edu.color }}
          onClick={() => onTrailClick(idx)}
        >
          {idx + 1}
        </div>
      ))}
    </div>
  );
};

export default EducationTrail;
