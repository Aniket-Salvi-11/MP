import React from 'react';
import './DiagnosisCard.css';

const DiagnosisCard = ({ title, description }) => {
  return (
    <div className="diagnosis-card">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default DiagnosisCard;