import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DiagnosticProvider } from './context/DiagnosticContext';
import MainLayout from './layouts/MainLayout/MainLayout'; // Updated path
import HomePage from './pages/HomePage/HomePage'; // Updated path
import SkinDiagnosisPage from './pages/SkinDiagnosisPage/SkinDiagnosisPage'; // Updated path
import LungHealthPage from './pages/LungHealthPage/LungHealthPage'; // Updated path
import SymptomAnalyzerPage from './pages/SymptomAnalyzerPage/SymptomAnalyzerPage'; // Updated path
import FractureDetectionPage from './pages/FractureDetectionPage/FractureDetectionPage'; // Updated path
import BreastHealthPage from './pages/BreastHealthPage/BreastHealthPage'; // Updated path
import PatientHistoryPage from './pages/PatientHistoryPage/PatientHistoryPage'; // Updated path
import './App.css'; // Using existing App.css instead of global.css

// Remove NotFoundPage and ScrollToTop imports since they weren't provided
// You can create these components later if needed

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
            {/* Remove the NotFoundPage route for now */}
          </Routes>
        </MainLayout>
      </Router>
    </DiagnosticProvider>
  );
}

export default App;