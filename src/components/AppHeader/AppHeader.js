import React from 'react';
import './AppHeader.css';

export default function AppHeader() {
  return (
    <header className="app-header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🩺</span>
            <h1>MedScan AI</h1>
          </div>
          <nav className="nav-menu">
            <a href="/" className="nav-link">Home</a>
            <a href="/skin-analysis" className="nav-link">Skin Analysis</a>
            <a href="/lung-health" className="nav-link">Lung Health</a>
            <a href="/history" className="nav-link">History</a>
          </nav>
        </div>
      </div>
    </header>
  );
}