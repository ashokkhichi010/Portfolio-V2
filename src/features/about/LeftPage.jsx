import React from 'react';

const LeftPage = ({ data }) => {
  return (
    <div className="about-page-content">
      <h2 className="about-left-title">{data.title}</h2>
    </div>
  );
};

export default LeftPage;
