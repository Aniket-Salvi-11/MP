import React, { useState } from 'react';
import './SymptomSelector.css';

const SymptomSelector = ({ selectedSymptoms, setSelectedSymptoms }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [availableSymptoms] = useState([
    'Fever', 'Cough', 'Shortness of breath', 'Fatigue',
    'Muscle aches', 'Headache', 'Sore throat', 'Rash',
    'Joint pain', 'Nausea', 'Vomiting', 'Diarrhea'
    // Add more symptoms as needed
  ]);

  const filteredSymptoms = availableSymptoms.filter(symptom =>
    symptom.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedSymptoms.includes(symptom)
  );

  const addSymptom = (symptom) => {
    setSelectedSymptoms([...selectedSymptoms, symptom]);
    setSearchTerm('');
  };

  const removeSymptom = (symptom) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
  };

  return (
    <div className="symptom-selector">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search symptoms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="selected-symptoms">
        {selectedSymptoms.map(symptom => (
          <span key={symptom} className="symptom-tag">
            {symptom}
            <button onClick={() => removeSymptom(symptom)}>×</button>
          </span>
        ))}
      </div>
      
      {searchTerm && filteredSymptoms.length > 0 && (
        <div className="symptom-suggestions">
          {filteredSymptoms.map(symptom => (
            <div 
              key={symptom} 
              className="symptom-option"
              onClick={() => addSymptom(symptom)}
            >
              {symptom}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SymptomSelector;