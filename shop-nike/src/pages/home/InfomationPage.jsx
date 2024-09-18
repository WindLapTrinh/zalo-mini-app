import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper"; // Import module Pagination
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "../../css/detailhome/infomationpage.css";

const InformationPage = () => {
  const navigate = useNavigate();
  const items = [
    {
      id: 1,
      image: "./images/infomation/anh-1.jpeg",
      title: "Sneakers of the Week",
      description: "Get frist dibs on the most-loved licks-every Friday at 8:00, only on the Nike.",
    },
    {
      id: 2,
      image: "./images/infomation/anh-2.jpg",
      title: "Nike Air Force 1",
      description: "Give your wardrobe a boost with this week's fresh arrivals.",
    },
    {
      id: 3,
      image: "./images/infomation/anh-3.jpeg",
      title: "Nike ZoomX",
      description: "Three chhers for great deals. Browse timeless styles at great prices.",
    },
  ];

  const handleItemProduct = () =>{
    navigate("/category")
  }
  return (
    <div className="nike-page">
      <div className="event-slider">
        <Swiper
          modules={[Pagination]} // Ensure you include Pagination module
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className}">-</span>`;
            },
          }}
          className="custom-silder-home"
        >
          {items.map((item) => (
            <SwiperSlide key={item.id} className="information-sile">
              <div className="slide-content" onClick={handleItemProduct}>
                <img src={item.image} alt={item.title} className="item-image" />
                <div className="item-info">
                  <h4 className="item-title">{item.title}</h4>
                  <p className="item-description">{item.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
};

export default InformationPage;
