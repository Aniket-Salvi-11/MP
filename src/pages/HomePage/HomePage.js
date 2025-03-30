import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Skin Condition Analysis",
      description: "Analyze skin images for potential conditions",
      path: "/skin-analysis"
    },
    {
      title: "Lung Health Check",
      description: "Analyze chest X-rays for lung conditions",
      path: "/lung-health"
    },
    {
      title: "Symptom Checker",
      description: "Get potential diagnoses based on symptoms",
      path: "/symptom-checker"
    },
    {
      title: "Fracture Detection",
      description: "Detect fractures in X-ray images",
      path: "/fracture-detection"
    },
    {
      title: "Breast Health Analysis",
      description: "Analyze breast ultrasound images",
      path: "/breast-health"
    }
  ];

  return (
    <div className="home-page">
      <h1>Medical Diagnostic Services</h1>
      <div className="services-grid">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="service-card"
            onClick={() => navigate(service.path)}
          >
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;