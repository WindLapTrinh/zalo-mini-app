import React from "react";
import "../../css/shop/findyou.css"; // Link to the CSS file

const images = [
  "/images/brand/nike.jpg",
  "/images/brand/nike-agg.jpg",
  "/images/brand/nike-sb.jpg",
  "/images/brand/jordan.png",
  "/images/brand/nike-by-you.jpg",
  "/images/brand/nike-lab.jpg",
];

const FindYou = () => {
  return (
    <div className="find-you-page">
      <h1 className="find-you-title">Shop by Brand</h1>
      
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
