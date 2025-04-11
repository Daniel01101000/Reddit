import React from 'react';
import '../../styles/Loading/LoadingSpinner.css';

export default function LoadingSpinner() {
  console.log("Rendering LoadingSpinner...");
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
}