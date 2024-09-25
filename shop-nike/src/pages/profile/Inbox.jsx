import React from "react";
import { Box, Text } from "zmp-ui";
import CustomHeader from "../shared/pages/CustomHeader";
import CustomBottomNavigation from "../shared/components/CustomBottomNavigation";

const Inbox = () => {
  return (
    <Box>
      <CustomHeader title={"Inbox"} showBackIcon={true}/>
      <Box className="box-inbox">
        <Box className="item-inbox">
          <Box className="header-inbox">
            <img
              className="image-inbox"
              src="./images/product/product-14.jpg"
              alt=""
            />
          </Box>
          <Box className="body-inbox">
            <Text className="title-inbox">Jordan x PSG collab</Text>
            <Text className="description-inbox">
              Rep the beatiful game with statement-making pieces.
            </Text>
            <Text className="time-inbox">1 days go</Text>
          </Box>
        </Box>
        <Box className="item-inbox">
          <Box className="header-inbox">
            <img
              className="image-inbox"
              src="./images/product/product-15.jpg"
              alt=""
            />
          </Box>
          <Box className="body-inbox">
            <Text className="title-inbox">Wind, Like what you saw?</Text>
            <Text className="description-inbox">
                You've spotted some great gear, get them now.
            </Text>
            <Text className="time-inbox">5 days go</Text>
          </Box>
        </Box>
        <Box className="item-inbox">
          <Box className="header-inbox">
            <img
              className="image-inbox"
              src="./images/product/product-17.jpg"
              alt=""
            />
          </Box>
          <Box className="body-inbox">
            <Text className="title-inbox">Fresh Drops Incoming</Text>
            <Text className="description-inbox">
                Chunky throwbacks, everyday classics and more from 16-18 Sep. Tap in to get notified.
            </Text>
            <Text className="time-inbox">5 days go</Text>
          </Box>
        </Box>
      </Box>
      <CustomBottomNavigation/>
    </Box>
  );
};
export default Inbox;
