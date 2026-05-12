import React from 'react';

const CoverPage = ({ data }) => {
  return (
    <div className="about-page-content cover-wrapper">
      <h2 className="about-cover-title">{data.title}</h2>
      {data.subtitle && <p className="about-cover-subtitle">{data.subtitle}</p>}
    </div>
  );
};

export default CoverPage;
