import React from "react";
import { Box, Button, Icon, Text, Input } from "zmp-ui";
import CustomHeader from "../shared/pages/CustomHeader";
import { BsChat } from "react-icons/bs";
import CustomBottomNavigation from "../shared/components/CustomBottomNavigation"
import "../../css/newform/home.css";

const items = [
  {
    id: 1,
    imgSrc:
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/cdab2e65822611.5cb4d8a89cae1.gif",
    title: "Nike Pegasus 41 By You",
    description:
      "The ever-versatile and responsive Pefasus 41 is ready for your personal touches. Chooose ypur colors, pick your laces. Add messages on the heels, like mileage foals or your birthday; whatever you want. You can even tweak the tech, like making the arch higher or swapping a Waffle sole for a lug sole. There are no rules. You do you.",
    hasCustomisation: true,
  },
  {
    id: 2,
    imgSrc: "/images/product/customer-3.jpeg",
    title: "Energetic response",
    description:
      "Ari Zoom units in the heel and forefoot team up width new ReactX foam for a midsole that is 13% more responsive than previous React teachnolory.",
    hasCustomisation: false,
  },
  {
    id: 3,
    imgSrc: "/images/product/customer-4.jpg",
    title: "Legendary fit",
    description:
      "The beloved fit and feel of Pegasus are alive and well in the 41. A soft,supportive mesh upper is now lighter and more breathable, while a plush tongue hungs the top of your foot.",
    hasCustomisation: true,
  },
];

const Home = () => {
  return (
    <Box>
      <CustomHeader title={"SNEACKERS OF THE WEEK"} showBackIcon={true} />
      <Box className="new-form-shose">
        {items.map((item) => (
          <Box key={item.id} className="item-form-shose">
            <img
              src={item.imgSrc}
              alt={item.title}
              className="img-form-shose"
            />
            <Box className="content-form-shose">
              <Text className="title-form-shose" bold>
                {item.title}
              </Text>
              <Text className="description-form-shose">{item.description}</Text>
            </Box>
            <Box className="func-form-shose">
              {item.hasCustomisation ? (
                <Box>
                  <Button className="button-form-shose" type="primary">
                    Customise
                  </Button>
                  <Box className="footer-form-shose">
                    <BsChat className="comment-icon" />
                  </Box>
                </Box>
              ) : null}
            </Box>
          </Box>
        ))}
      </Box>
      <Box className="comment-form-shose">
         <Text className="title-comment">Comments</Text>
         <Input></Input>
      </Box>
      <CustomBottomNavigation/>
    </Box>
  );
};

export default Home;
