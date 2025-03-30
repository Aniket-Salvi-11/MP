import React, { useState } from 'react';
import { useDiagnostic } from '../../context/DiagnosticContext';
import DiagnosisCard from '../../components/DiagnosisCard/DiagnosisCard';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import AnalysisResults from '../../components/AnalysisResults/AnalysisResults';
import { analyzeLungImage } from '../../services/api';
import './LungHealthPage.css';

const LungHealthPage = () => {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState(null);
  const { isLoading, setIsLoading, addToHistory } = useDiagnostic();

  const handleAnalyze = async () => {
    setIsLoading(true);
    try {
      const analysisResults = await analyzeLungImage(image);
      setResults(analysisResults);
      addToHistory({
        type: 'lung',
        image,
        results: analysisResults,
        date: new Date().toLocaleString()
      });
    } catch (error) {
      console.error("Analysis failed:", error);
      // You could add error state handling here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="diagnosis-page">
      <DiagnosisCard 
        title="Lung Health Analysis"
        description="Upload a chest X-ray to detect potential lung conditions"
      />
      
      <div className="analysis-container">
        <ImageUploader 
          image={image}
          setImage={setImage}
          accept="image/*"
        />
        
        <button 
          onClick={handleAnalyze}
          disabled={!image || isLoading}
          className="primary-button"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Image'}
        </button>
        
        {results && <AnalysisResults results={results} type="lung" />}
      </div>
    </div>
  );
};

export default LungHealthPage;