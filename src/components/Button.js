import React from 'react';
import './Button.css';

export default function Button({ children, loading, ...props }) {
  return (
    <button className={`button ${loading ? 'loading' : ''}`} {...props}>
      {loading ? (
        <>
          <span className="spinner"></span>
          {children}
        </>
      ) : children}
    </button>
  );
}