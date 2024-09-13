import React from 'react';
import '../styles/popup.css'; // Tạo file CSS để định dạng popup

const Popup = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close" onClick={onClose}>×</button>
        <img className='image-popup' src='/images/popup/popup-1.jpg' alt='popup makert'/>
      </div>
    </div>
  );
};

export default Popup;
