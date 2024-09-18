import React, { useState, useEffect } from 'react';
import '../styles/toast.css'; // Đường dẫn tới file CSS

const CustomToast = ({ message, visible, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration]);

  return (
    isVisible && (
      <div className="custom-toast">
        <span>{message}</span>
      </div>
    )
  );
};

export default CustomToast;
