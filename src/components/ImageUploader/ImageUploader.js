import React, { useState } from 'react';
import './ImageUploader.css';

export default function ImageUploader({ image, setImage }) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="image-uploader">
      <div 
        className={`upload-area ${dragActive ? 'active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          id="image-upload"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
          className="upload-input"
        />
        <label htmlFor="image-upload" className="upload-label">
          {image ? (
            <>
              <span className="upload-icon">🖼️</span>
              <p>Click or drag to replace image</p>
            </>
          ) : (
            <>
              <span className="upload-icon">📤</span>
              <p>Drag & drop your image here</p>
              <p className="upload-hint">or click to browse files</p>
            </>
          )}
        </label>
      </div>
      
      {image && (
        <div className="image-preview">
          <img 
            src={URL.createObjectURL(image)} 
            alt="Preview" 
            className="preview-image"
          />
        </div>
      )}
    </div>
  );
}