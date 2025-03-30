import React from 'react';
import './ImageUploader.css';

const ImageUploader = ({ image, setImage, accept }) => {
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="image-uploader">
      <label className="upload-label">
        {image ? 'Change Image' : 'Select Image'}
        <input 
          type="file" 
          onChange={handleImageChange}
          accept={accept}
          className="upload-input"
        />
      </label>
      
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
};

export default ImageUploader;