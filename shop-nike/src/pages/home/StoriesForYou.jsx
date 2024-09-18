import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import {
    BottomNavigation,
    Box,
    Icon,
    Page,
    Sheet,
    Text,
    Input,
    Button
  } from "zmp-ui";
  import "../../css/detailhome/storiesforyou.css";

const items = [
  {
    id: 1,
    image: "./images/product/customer-1.jpg",
    note: "Product Care",
    title: "3 ways to clean Ari Force 1s",
  },
  {
    id: 2,
    image: "./images/stories/anh-2.jpg",
    note: "Sport & Activity",
    title: "The 5 best Nike sneakers",
  },
  {
    id: 3,
    image: "./images/stories/anh-3.jpg",
    note: "Wind Lap Trinh",
    title: "Đội ngủ lập trình Gen Z",
  },
];

const StoriesForYou = () => {
  return (
    <Page className="stories-for-you-page">
      <Box className="page-header-stories">
        <div className="title-section-stories">
          <img className="img-stories" src="./images/icon/icon-stories.png" alt="" />
          <h1 className="title-stories">Stories for You</h1>
        </div>
        <a href="#view-all" className="view-all">
          View All
        </a>
      </Box>
      <Box className="body-section-stories">
        <div className="main-story-stories">
          <img src="https://cdn.dribbble.com/users/223047/screenshots/1584852/nike_animation.gif" alt="Main Story" className="main-image-stories" />
          <p className="note-stories">Buying Guide</p>
        </div>
        <div className="stories-slider">
          <Swiper spaceBetween={20} slidesPerView={1.5}>
            {items.map((item) => (
              <SwiperSlide key={item.id} className="story-slide-stories">
                <div className="story-card-stories">
                  <img src={item.image} alt={item.title} className="story-image-stories" />
                  <div className="story-content-stories">
                    <p className="story-note-stories">{item.note}</p>
                    <h3 className="story-title-stories">{item.title}</h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        <Box className="submit-stories">
        <Button fullWidth className="button-stories" type="primary" block>
                      View All
          </Button>
        </Box>
        </div>
      </Box>
    </Page>
  );
};

export default StoriesForYou;
