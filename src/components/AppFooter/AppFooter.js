import React from 'react';
import './AppFooter.css';

export default function AppFooter() {
  return (
    <footer className="app-footer">
      <p>© {new Date().getFullYear()} AI Doctor Assistant</p>
    </footer>
  );
}