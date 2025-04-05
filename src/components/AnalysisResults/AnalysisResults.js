import React from 'react';
import './AnalysisResults.css';

export default function AnalysisResults({ results, type }) {
  const getSeverityClass = (confidence) => {
    if (confidence > 70) return 'severity-high';
    if (confidence > 40) return 'severity-medium';
    return 'severity-low';
  };

  return (
    <div className="analysis-results fade-in">
      <h3 className="results-title">Analysis Results</h3>
      
      <div className="results-grid">
        <div className="results-visualization">
          {results.visualization && (
            <img 
              src={`data:image/png;base64,${results.visualization}`} 
              alt="Analysis visualization"
              className="result-image"
            />
          )}
        </div>
        
        <div className="results-details">
          <div className="result-item">
            <h4>Primary Diagnosis</h4>
            <p className={getSeverityClass(results.conditions[0].confidence)}>
              {results.conditions[0].name} ({Math.round(results.conditions[0].confidence * 100)}% confidence)
            </p>
          </div>
          
          <div className="result-item">
            <h4>Other Possible Conditions</h4>
            <ul className="conditions-list">
              {results.conditions.slice(1).map((condition, index) => (
                <li key={index} className={getSeverityClass(condition.confidence)}>
                  {condition.name} ({Math.round(condition.confidence * 100)}%)
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="recommendations">
        <h4>Recommendations</h4>
        <ul>
          {results.recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}