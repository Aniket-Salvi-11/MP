import React from 'react';
import './HistoryItem.css';

const HistoryItem = ({ item }) => {
  return (
    <div className="history-item">
      <div className="history-header">
        <h3>{item.type} Analysis</h3>
        <span>{item.date}</span>
      </div>
      <div className="history-content">
        {/* Add content rendering logic */}
      </div>
    </div>
  );
};

export default HistoryItem;