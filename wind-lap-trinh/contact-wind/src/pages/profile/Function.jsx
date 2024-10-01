import React from 'react';
import { Box, Text } from 'zmp-ui';
import { MdShoppingCart, MdVpnKey, MdEvent, MdSettings } from 'react-icons/md'; 
import { BsBoxSeam } from "react-icons/bs";
import { PiQrCodeLight } from "react-icons/pi";
import { BsCalendar4Event } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import '../../css/profile/home.css';

const functions = [
  { name: 'Order', icon: <BsBoxSeam size={24} /> },
  { name: 'Pass', icon: <PiQrCodeLight size={24} /> },
  { name: 'Events', icon: <BsCalendar4Event size={24} /> },
  { name: 'Settings', icon: <IoSettingsOutline size={24} /> },
];

const Functions = () => {
  return (
    <Box className="profile-functions">
      {functions.map((func, index) => (
        <Box
          key={func.name}
          className={`profile-func-item ${index !== functions.length - 1 ? 'border-right' : ''}`}
          textAlign="center"
        >
          <Box className="profile-func-icon">{func.icon}</Box>
          <Text className="profile-func-name">{func.name}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default Functions;
