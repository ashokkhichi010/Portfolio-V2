import React from 'react';

const RightPage = ({ data }) => {
  return (
    <div className="about-page-content right-content-wrapper">
      <p className="about-right-desc">{data.description}</p>
      <ul className="about-right-list">
        {data.listItems && data.listItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default RightPage;
