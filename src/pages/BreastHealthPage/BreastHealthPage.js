import React, { useState } from 'react';
import { useDiagnostic } from '../../context/DiagnosticContext';
import DiagnosisCard from '../../components/DiagnosisCard/DiagnosisCard';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import AnalysisResults from '../../components/AnalysisResults/AnalysisResults';
import { analyzeBreastImage } from '../../services/api';
import './BreastHealthPage.css';

const BreastHealthPage = () => {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState(null);
  const { isLoading, setIsLoading, addToHistory } = useDiagnostic();

  const handleAnalyze = async () => {
    setIsLoading(true);
    try {
      const analysisResults = await analyzeBreastImage(image);
      setResults(analysisResults);
      addToHistory({
        type: 'breast',
        image,
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
        title="Breast Health Analysis"
        description="Upload a breast ultrasound image for analysis"
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
        
        {results && (
          <div className="results-container">
            <h3>Analysis Results</h3>
            <div className="image-comparison">
              <div>
                <h4>Original Image</h4>
                <img src={URL.createObjectURL(image)} alt="Original" />
              </div>
              <div>
                <h4>Analysis</h4>
                <img src={`data:image/png;base64,${results.annotation}`} alt="Analysis" />
              </div>
            </div>
            
            <div className="result-item">
              <h4>Findings:</h4>
              <p>{results.findings}</p>
            </div>
            
            <div className="result-item">
              <h4>Recommendations:</h4>
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

export default BreastHealthPage;