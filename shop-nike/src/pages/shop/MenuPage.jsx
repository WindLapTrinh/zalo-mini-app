import React, { useState } from 'react';
import '../../css/shop/menupage.css';

const categories = [
  {
    id: 1,
    title: 'New & Featured',
    subCategories: ['App Early Access', 'Football Kits', 'New Releases', 'Bestsellers', 'Member Shop', 'Top Picks Under 3,000,000 đ'],
  },
  {
    id: 2,
    title: 'Shoes',
    subCategories: ['All Shoes', '3 Days Drops', 'Latest Sneakers', 'Ari Max', 'Air Force 1', 'Air Jordan 1', 'Dunk', 'Lifestyle'],
  },
  {
    id: 3,
    title: 'Clothing & Accessories',
    subCategories: ['All Clothing', 'New Releases', 'Top and T-shirts', 'Shorts', 'Pants and Leggings', 'Hoodies and Sweatshirts'],
  },
  {
    id: 4,
    title: 'Sale',
    subCategories: ['Shop All Sale', 'Shoes', 'Clothing', 'Accessories'],
  },
];

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const toggleCategory = (id) => {
    setActiveCategory(activeCategory === id ? null : id);
  };

  return (
    <div className="menu-page">
      {categories.map((category) => (
        <div key={category.id} className="menu-item">
          <div
            className={`parent-category ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => toggleCategory(category.id)}
          >
            <h2>{category.title}</h2>
          </div>
          <div className={`sub-category ${activeCategory === category.id ? 'expanded' : ''}`}>
            {category.subCategories.map((sub, idx) => (
              <div key={idx} className="sub-category-item">
                {sub}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuPage;
