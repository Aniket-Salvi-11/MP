import React from 'react';
import { useDiagnostic } from '../../context/DiagnosticContext';
import HistoryItem from '../../components/HistoryItem/HistoryItem';
import './PatientHistoryPage.css';

const PatientHistoryPage = () => {
  const { patientHistory } = useDiagnostic();

  return (
    <div className="history-page">
      <h2>Your Diagnosis History</h2>
      
      {patientHistory.length === 0 ? (
        <p className="no-history">No history available yet</p>
      ) : (
        <div className="history-list">
          {patientHistory.map((item, index) => (
            <HistoryItem key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientHistoryPage;