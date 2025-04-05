import React, { createContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const DiagnosticContext = createContext();

export function DiagnosticProvider({ children }) {
  const [patientHistory, setPatientHistory] = useState(() => {
    const saved = localStorage.getItem('patientHistory');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [currentDiagnosis, setCurrentDiagnosis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addToHistory = useCallback((diagnosis) => {
    const entry = {
      ...diagnosis,
      id: uuidv4(),
      date: new Date().toISOString(),
      viewed: false
    };
    
    setPatientHistory(prev => {
      const updated = [entry, ...prev];
      localStorage.setItem('patientHistory', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const value = {
    patientHistory,
    currentDiagnosis,
    isLoading,
    error,
    addToHistory,
    setIsLoading,
    setError
  };

  return (
    <DiagnosticContext.Provider value={value}>
      {children}
    </DiagnosticContext.Provider>
  );
}

export function useDiagnostic() {
  const context = React.useContext(DiagnosticContext);
  if (!context) {
    throw new Error('useDiagnostic must be used within a DiagnosticProvider');
  }
  return context;
}