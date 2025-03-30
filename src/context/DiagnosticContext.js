import React, { createContext, useState, useContext } from 'react';

const DiagnosticContext = createContext();

export const DiagnosticProvider = ({ children }) => {
  const [patientHistory, setPatientHistory] = useState([]);
  const [currentDiagnosis, setCurrentDiagnosis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const addToHistory = (diagnosis) => {
    setPatientHistory(prev => [...prev, diagnosis]);
  };

  return (
    <DiagnosticContext.Provider
      value={{
        patientHistory,
        currentDiagnosis,
        isLoading,
        setCurrentDiagnosis,
        setIsLoading,
        addToHistory
      }}
    >
      {children}
    </DiagnosticContext.Provider>
  );
};

export const useDiagnostic = () => useContext(DiagnosticContext);