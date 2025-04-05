const API_BASE_URL = 'http://localhost:5000/api';

export const analyzeSymptoms = async (symptoms, patientInfo) => {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze/symptoms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        symptoms,
        patient_info: patientInfo
      }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error analyzing symptoms:', error);
    throw error;
  }
};

export const analyzeMedicalImage = async (file, analysisType) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', analysisType);

    const response = await fetch(`${API_BASE_URL}/analyze/image`, {
      method: 'POST',
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
};

export const getPatientHistory = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/history`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching patient history:', error);
    throw error;
  }
};

export const saveDiagnosis = async (diagnosisData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(diagnosisData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error saving diagnosis:', error);
    throw error;
  }
};

// Add these specialized analysis functions
export const analyzeBreastImage = (file) => 
  analyzeMedicalImage(file, 'breast');

export const analyzeFracture = (file) =>
  analyzeMedicalImage(file, 'fracture');

export const analyzeLungImage = (file) =>
  analyzeMedicalImage(file, 'lung');

export const analyzeSkinImage = (file) =>
  analyzeMedicalImage(file, 'skin');