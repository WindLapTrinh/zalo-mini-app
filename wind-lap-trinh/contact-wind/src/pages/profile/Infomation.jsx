import React from "react";
import { Box, Button, Text, Avatar } from "zmp-ui";
import "../../css/profile/home.css"; // Custom CSS for styling

const Information = () => {
  return (
    <Box className="profile-information" textAlign="center">
      <img
        src="./images/logo/wind-app.png" // Placeholder image URL for avatar
        size="large"
        alt="User Avatar"
        className="profile-avatar"
      />
      <Text className="mt-2 mb-2 name-profile" size="large" bold>
        Wind Lập Trình
      </Text>
      <Button className="mt-4 edit-profile-btn" type="primary">
        Edit Profile
      </Button>
    </Box>
  );
};

export default Information;
