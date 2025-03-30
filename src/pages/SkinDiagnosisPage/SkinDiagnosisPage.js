import React, { useState } from 'react';
import { useDiagnostic } from '../../context/DiagnosticContext';
import DiagnosisCard from '../../components/DiagnosisCard/DiagnosisCard';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import AnalysisResults from '../../components/AnalysisResults/AnalysisResults';
import { analyzeSkinImage } from '../../services/api';
import './SkinDiagnosisPage.css';

const SkinDiagnosisPage = () => {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState(null);
  const { isLoading, setIsLoading, addToHistory } = useDiagnostic();

  const handleAnalyze = async () => {
    setIsLoading(true);
    try {
      const response = await analyzeSkinImage(image);
      setResults(response.data);
      addToHistory({
        type: 'skin',
        image,
        results: response.data,
        date: new Date().toLocaleString()
      });
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="skin-diagnosis-page">
      <DiagnosisCard 
        title="Skin Condition Analysis"
        description="Upload an image of your skin concern for analysis"
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
        
        {results && <AnalysisResults results={results} type="skin" />}
      </div>
    </div>
  );
};

export default SkinDiagnosisPage;