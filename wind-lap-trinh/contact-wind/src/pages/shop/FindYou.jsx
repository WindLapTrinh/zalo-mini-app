import React from "react";
import "../../css/shop/findyou.css"; // Link to the CSS file

const images = [
  "/images/shop/find-you-1.jpg",
  "/images/shop/find-you-2.jpg",
  "/images/shop/find-you-3.jpg",
  "/images/shop/find-you-4.jpg",
  "/images/shop/find-you-5.jpg",
  "/images/shop/find-you-6.jpg",
];

const FindYou = () => {
  return (
    <div className="find-you-page">
      <h1 className="find-you-title">Find You Nike</h1>
      
      <div className="image-grid">
        {images.map((src, index) => (
          <div key={index} className="image-item">
            <img src={src} alt={`find-you-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindYou;
