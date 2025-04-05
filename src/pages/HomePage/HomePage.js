import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const services = [
  {
    title: "Skin Analysis",
    description: "Upload images of skin conditions for AI-powered diagnosis",
    icon: "🔍",
    path: "/skin-analysis"
  },
  {
    title: "Lung Health",
    description: "Analyze chest X-rays for potential lung conditions",
    icon: "🫁",
    path: "/lung-health"
  },
  {
    title: "Symptom Checker",
    description: "Enter your symptoms for possible diagnoses",
    icon: "📋",
    path: "/symptom-checker"
  },
  {
    title: "Fracture Detection",
    description: "Upload X-ray images to detect bone fractures",
    icon: "🦴",
    path: "/fracture-detection"
  },
  {
    title: "Breast Health",
    description: "Analyze mammogram images for abnormalities",
    icon: "❤️",
    path: "/breast-health"
  }
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <h1>AI-Powered Medical Diagnosis</h1>
          <p className="subtitle">
            Get accurate, instant analysis of medical images and symptoms
          </p>
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          <h2>Our Services</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <div 
                key={index}
                className="service-card"
                onClick={() => navigate(service.path)}
              >
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <button className="btn btn-primary">Try Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}