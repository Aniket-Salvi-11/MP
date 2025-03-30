import React from 'react';
import AppHeader from '../../components/AppHeader/AppHeader';
import AppFooter from '../../components/AppFooter/AppFooter';
import './MainLayout.css';

console.log("AppHeader:", AppHeader);
console.log("AppFooter:", AppFooter);

const MainLayout = ({ children }) => {
  return (
    <div className="app-container">
      <AppHeader />
      <main className="main-content">
        {children}
      </main>
      <AppFooter />
    </div> 
  );
};

export default MainLayout;
