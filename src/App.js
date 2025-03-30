import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DiagnosticProvider } from './context/DiagnosticContext';
import MainLayout from './layouts/MainLayout/MainLayout';
import HomePage from './pages/HomePage/HomePage';
import SkinDiagnosisPage from './pages/SkinDiagnosisPage/SkinDiagnosisPage';
import LungHealthPage from './pages/LungHealthPage/LungHealthPage';
import SymptomAnalyzerPage from './pages/SymptomAnalyzerPage/SymptomAnalyzerPage';
import FractureDetectionPage from './pages/FractureDetectionPage/FractureDetectionPage';
import BreastHealthPage from './pages/BreastHealthPage/BreastHealthPage';
import PatientHistoryPage from './pages/PatientHistoryPage/PatientHistoryPage';

function App() {
  return (
    <DiagnosticProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/skin-analysis" element={<SkinDiagnosisPage />} />
            <Route path="/lung-health" element={<LungHealthPage />} />
            <Route path="/symptom-checker" element={<SymptomAnalyzerPage />} />
            <Route path="/fracture-detection" element={<FractureDetectionPage />} />
            <Route path="/breast-health" element={<BreastHealthPage />} />
            <Route path="/history" element={<PatientHistoryPage />} />
          </Routes>
        </MainLayout>
      </Router>
    </DiagnosticProvider>
  );
}

export default App;