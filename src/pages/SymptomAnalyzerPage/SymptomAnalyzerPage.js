import React, { useState } from 'react';
import { useDiagnostic } from '../../context/DiagnosticContext';
import DiagnosisCard from '../../components/DiagnosisCard/DiagnosisCard';
import SymptomSelector from '../../components/SymptomSelector/SymptomSelector';
import { analyzeSymptoms } from '../../services/api';
import './SymptomAnalyzerPage.css';

const SymptomAnalyzerPage = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [results, setResults] = useState(null);
  const { isLoading, setIsLoading, addToHistory } = useDiagnostic();

  const handleAnalyze = async () => {
    if (selectedSymptoms.length === 0) return;
    
    setIsLoading(true);
    try {
      const analysisResults = await analyzeSymptoms(selectedSymptoms);
      setResults(analysisResults);
      addToHistory({
        type: 'symptoms',
        symptoms: selectedSymptoms,
        results: analysisResults,
        date: new Date().toLocaleString()
      });
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="diagnosis-page">
      <DiagnosisCard 
        title="Symptom Analyzer"
        description="Select your symptoms to get potential diagnoses"
      />
      
      <div className="analysis-container">
        <SymptomSelector 
          selectedSymptoms={selectedSymptoms}
          setSelectedSymptoms={setSelectedSymptoms}
        />
        
        <button 
          onClick={handleAnalyze}
          disabled={selectedSymptoms.length === 0 || isLoading}
          className="primary-button"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Symptoms'}
        </button>
        
        {results && (
          <div className="results-container">
            <h3>Analysis Results</h3>
            <div className="result-item">
              <h4>Most Likely Condition:</h4>
              <p>{results.primaryDiagnosis} ({results.confidence}% confidence)</p>
            </div>
            
            <div className="result-item">
              <h4>Other Possible Conditions:</h4>
              <ul>
                {results.secondaryDiagnoses.map((diagnosis, index) => (
                  <li key={index}>{diagnosis.name} ({diagnosis.confidence}%)</li>
                ))}
              </ul>
            </div>
            
            <div className="result-item">
              <h4>Recommended Actions:</h4>
              <ul>
                {results.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomAnalyzerPage;