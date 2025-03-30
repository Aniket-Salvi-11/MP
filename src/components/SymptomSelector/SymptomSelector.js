import React, { useState } from 'react';
import './SymptomSelector.css';

const SymptomSelector = ({ selectedSymptoms, setSelectedSymptoms }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample symptoms - replace with your actual list
  const allSymptoms = [
    'Fever', 'Cough', 'Headache', 'Fatigue',
    'Rash', 'Nausea', 'Shortness of breath'
  ];

  const filteredSymptoms = allSymptoms.filter(
    symptom => symptom.toLowerCase().includes(searchTerm.toLowerCase()) &&
              !selectedSymptoms.includes(symptom)
  );

  const addSymptom = (symptom) => {
    setSelectedSymptoms([...selectedSymptoms, symptom]);
  };

  const removeSymptom = (symptom) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
  };

  return (
    <div className="symptom-selector">
      <input
        type="text"
        placeholder="Search symptoms..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* Add symptom selection UI */}
    </div>
  );
};

export default SymptomSelector;