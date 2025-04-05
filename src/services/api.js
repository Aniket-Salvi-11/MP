import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 30000,
});

// Image Analysis Endpoints
export const analyzeSkinImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  const response = await api.post('/skin-analysis', formData);
  return response.data;
};

export const analyzeBreastImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  const response = await api.post('/breast-analysis', formData);
  return response.data;
};

export const analyzeLungImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  const response = await api.post('/lung-analysis', formData);
  return response.data;
};

export const analyzeFracture = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  const response = await api.post('/fracture-analysis', formData);
  return response.data;
};

// Symptom Analysis Endpoint
export const analyzeSymptoms = async (symptoms) => {
  const response = await api.post('/symptom-analysis', { symptoms });
  return response.data;
};

export default api;