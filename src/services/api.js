import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add all required API functions
export const analyzeSkinImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  return api.post('/skin-analysis', formData);
};

export const analyzeLungImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  return api.post('/lung-analysis', formData);
};

export const analyzeBreastImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  return api.post('/breast-analysis', formData);
};

export const analyzeFracture = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  return api.post('/fracture-analysis', formData);
};

export const analyzeSymptoms = async (symptoms) => {
  return api.post('/symptom-analysis', { symptoms });
};