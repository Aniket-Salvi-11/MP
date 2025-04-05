import React from 'react';
import AppHeader from '../../components/AppHeader/AppHeader';
import AppFooter from '../../components/AppFooter/AppFooter';
import './MainLayout.css';

export default function MainLayout({ children }) {
  return (
    <div className="app-layout">
      <AppHeader />
      <main className="app-main">
        {children}
      </main>
      <AppFooter />
    </div>
  );
}