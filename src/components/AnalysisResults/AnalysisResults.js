import React from 'react';
import { Pie } from 'react-chartjs-2';
import './AnalysisResults.css';

const AnalysisResults = ({ results, type }) => {
  const renderSkinResults = () => {
    const data = {
      labels: results.conditions.map(c => c.name),
      datasets: [{
        data: results.conditions.map(c => c.confidence * 100),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
        ]
      }]
    };

    return (
      <div className="results-container">
        <h3>Analysis Results</h3>
        <div className="results-visualization">
          <div className="chart-container">
            <Pie 
              data={data}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'right' },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.label}: ${context.raw.toFixed(1)}%`
                    }
                  }
                }
              }}
            />
          </div>
          {results.visualization && (
            <div className="image-result">
              <img 
                src={`data:image/png;base64,${results.visualization}`} 
                alt="Analysis Visualization"
                className="result-image"
              />
            </div>
          )}
        </div>
        
        <div className="results-details">
          <h4>Most Likely Condition:</h4>
          <p className="primary-diagnosis">
            {results.conditions[0].name} ({Math.round(results.conditions[0].confidence * 100)}% confidence)
          </p>
          
          <h4>Recommendations:</h4>
          <ul className="recommendations">
            <li>Consult with a dermatologist for confirmation</li>
            <li>Monitor for any changes in the affected area</li>
            <li>Avoid scratching or irritating the area</li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="analysis-results">
      {type === 'skin' && renderSkinResults()}
    </div>
  );
};

export default AnalysisResults;