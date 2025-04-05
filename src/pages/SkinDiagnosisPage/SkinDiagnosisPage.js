import React, { useState } from 'react';
import { useDiagnostic } from '../../context/DiagnosticContext';

// Update these imports to match your actual file paths
import DiagnosisCard from '../../components/DiagnosisCard/DiagnosisCard';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import AnalysisResults from '../../components/AnalysisResults/AnalysisResults';

import { analyzeSkinImage } from '../../services/api';
import Button from '../../components/Button';
import './SkinDiagnosisPage.css';

export default function SkinDiagnosisPage() {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState(null);
  const { isLoading, setIsLoading, addToHistory } = useDiagnostic();

  const handleAnalyze = async () => {
    setIsLoading(true);
    try {
      const analysisResults = await analyzeSkinImage(image);
      setResults(analysisResults);
      addToHistory({
        type: 'skin',
        image,
        results: analysisResults
      });
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="skin-diagnosis container">
      <DiagnosisCard 
        title="Skin Condition Analysis"
        description="Upload an image of your skin concern for analysis"
      />
      
      <div className="analysis-flow">
        <ImageUploader image={image} setImage={setImage} />
        
        <Button
          onClick={handleAnalyze}
          disabled={!image || isLoading}
          loading={isLoading}
        >
          Analyze Image
        </Button>
        
        {results && <AnalysisResults results={results} type="skin" />}
      </div>
    </div>
  );
}