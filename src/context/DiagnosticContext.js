import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  analyzeSymptoms, 
  analyzeMedicalImage,
  getPatientHistory,
  saveDiagnosis
} from '../services/api';

const DiagnosticContext = createContext();

export const DiagnosticProvider = ({ children }) => {
  const [diagnoses, setDiagnoses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const { history } = await getPatientHistory();
        setDiagnoses(history);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const addDiagnosis = async (diagnosis) => {
    try {
      setIsLoading(true);
      const result = await saveDiagnosis(diagnosis);
      setDiagnoses(prev => [result, ...prev]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeSymptoms = async (symptoms, patientInfo) => {
    try {
      setIsLoading(true);
      const result = await analyzeSymptoms(symptoms, patientInfo);
      await addDiagnosis({
        ...result,
        type: 'symptoms',
        timestamp: new Date().toISOString()
      });
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeImage = async (file, analysisType) => {
    try {
      setIsLoading(true);
      const result = await analyzeMedicalImage(file, analysisType);
      await addDiagnosis({
        ...result,
        type: 'image',
        timestamp: new Date().toISOString()
      });
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DiagnosticContext.Provider
      value={{
        diagnoses,
        isLoading,
        error,
        analyzeSymptoms,
        analyzeImage,
        addDiagnosis
      }}
    >
      {children}
    </DiagnosticContext.Provider>
  );
};

export const useDiagnostic = () => {
  const context = useContext(DiagnosticContext);
  if (!context) {
    throw new Error('useDiagnostic must be used within a DiagnosticProvider');
  }
  return context;
};