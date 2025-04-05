import React, { useState, useContext } from 'react';
import { useDiagnostic } from '../../context/DiagnosticContext';
import './ImageUploader.css';

const ImageUploader = ({ analysisType }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const { analyzeImage, isLoading, error } = useDiagnostic();
  const [results, setResults] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    try {
      const analysisResults = await analyzeImage(file, analysisType);
      setResults(analysisResults);
    } catch (err) {
      console.error('Image analysis failed:', err);
    }
  };

  return (
    <div className="image-uploader">
      <h3>Upload {analysisType === 'skin' ? 'Skin' : 'X-ray'} Image</h3>
      
      <input 
        type="file" 
        onChange={handleFileChange}
        accept="image/*"
        disabled={isLoading}
      />
      
      {preview && (
        <div className="image-preview">
          <img src={preview} alt="Preview" />
        </div>
      )}
      
      <button 
        onClick={handleUpload}
        disabled={isLoading || !file}
      >
        {isLoading ? 'Analyzing...' : 'Analyze Image'}
      </button>
      
      {error && <div className="error-message">{error}</div>}
      {results && (
        <div className="analysis-results">
          <h4>Results:</h4>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;