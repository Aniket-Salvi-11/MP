import React from 'react';
import './DiagnosisCard.css';

export default function DiagnosisCard({ title, description }) {
  return (
    <div className="diagnosis-card">
      <div className="card-header">
        <div className="card-icon">🩺</div>
        <h2>{title}</h2>
      </div>
      <p>{description}</p>
    </div>
  );
}