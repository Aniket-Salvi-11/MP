import React, { useState } from 'react';
import { useDiagnostic } from '../../context/DiagnosticContext';
import DiagnosisCard from '../../components/DiagnosisCard/DiagnosisCard';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import AnalysisResults from '../../components/AnalysisResults/AnalysisResults';
import { analyzeFracture } from '../../services/api';
import './FractureDetectionPage.css';

const FractureDetectionPage = () => {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState(null);
  const { isLoading, setIsLoading, addToHistory } = useDiagnostic();

  const handleAnalyze = async () => {
    setIsLoading(true);
    try {
      const analysisResults = await analyzeFracture(image);
      setResults(analysisResults);
      addToHistory({
        type: 'fracture',
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
        title="Fracture Detection"
        description="Upload an X-ray image to detect potential fractures"
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
              <h4>Detection Result:</h4>
              <p>{results.fractureDetected ? 
                `Fracture detected with ${results.confidence}% confidence` : 
                'No fracture detected'}
              </p>
            </div>
            
            {results.fractureDetected && (
              <div className="result-item">
                <h4>Recommended Actions:</h4>
                <ul>
                  <li>Consult with an orthopedic specialist</li>
                  <li>Immobilize the affected area</li>
                  <li>Apply ice to reduce swelling</li>
                  <li>Avoid putting weight on the affected limb</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FractureDetectionPage;