import React from 'react';

const EducationSlide = ({ edu, index }) => {
  const slideStyles = {
    '--edu-color': edu.color,
    '--edu-bg': edu.bgColor,
    '--edu-accent': edu.accentColor
  };

  return (
    <div 
      className={`box slide-index-${index}`} 
      style={slideStyles}
    >
      <div className="bg"></div>
      <div className="details">
        <h1 className="animate-item">{edu.degree}</h1>
        <h2 className="edu-institution animate-item">
          {edu.institution}
        </h2>
        <p className="animate-item">{edu.description}</p>
      </div>
      <div className="illustration">
        <div className="inner animate-item">
          <div className="inner-content">
            <span className="inner-shortform">{edu.shortForm}</span>
            <span className="edu-period animate-item">{edu.period}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationSlide;
