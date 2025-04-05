import React, { useState, useContext } from 'react';
import { useDiagnostic } from '../../context/DiagnosticContext';
import SymptomSelector from '../../components/SymptomSelector/SymptomSelector';
import AnalysisResults from '../../components/AnalysisResults/AnalysisResults';

const SymptomAnalyzerPage = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [patientInfo, setPatientInfo] = useState({
    age: '',
    gender: '',
    medicalHistory: ''
  });
  const { analyzeSymptoms, isLoading, error } = useDiagnostic();
  const [results, setResults] = useState(null);

  const handleAnalyze = async () => {
    try {
      const analysisResults = await analyzeSymptoms(selectedSymptoms, patientInfo);
      setResults(analysisResults);
    } catch (err) {
      console.error('Analysis failed:', err);
    }
  };

  return (
    <div className="symptom-analyzer-page">
      <h2>Symptom Analyzer</h2>
      
      <div className="patient-info-form">
        {/* Add patient info form fields here */}
      </div>
      
      <SymptomSelector 
        selectedSymptoms={selectedSymptoms}
        onSelect={setSelectedSymptoms}
      />
      
      <button 
        onClick={handleAnalyze}
        disabled={isLoading || selectedSymptoms.length === 0}
      >
        {isLoading ? 'Analyzing...' : 'Analyze Symptoms'}
      </button>
      
      {error && <div className="error-message">{error}</div>}
      {results && <AnalysisResults results={results} />}
    </div>
  );
};

export default SymptomAnalyzerPage;