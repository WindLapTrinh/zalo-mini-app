import React, { useState, useEffect } from "react";
import { Box } from "zmp-ui";
import { BsBootstrapFill } from "react-icons/bs";
import { FaMobileScreenButton } from "react-icons/fa6";
import { BsExplicitFill } from "react-icons/bs";
import { PiSealCheckFill } from "react-icons/pi";
import { BsStripe } from "react-icons/bs";
import "../../css/detailhome/infroduce.css";

const Introduce = () => {
  const [content, setContent] = useState({
    mesage:"Thiết kế website",
    icon: <BsExplicitFill/>
  });

  useEffect(() => {
    const messages = [
      {mesage:"Thiết kế website", icon: <BsExplicitFill/>},
      {mesage:"Thiết kế mini app",icon:<FaMobileScreenButton/>},
      {mesage:"Thiết kế phần mềm",icon:<BsStripe/>},
      {mesage:"Brand thương hiệu", icon: <BsBootstrapFill/>}
    ];
    
    let index = 0;

    const intervalId = setInterval(() => {
      index = (index + 1) % messages.length;
      setContent(messages[index]);
    }, 1500);

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <Box className="introduce-home">
      <div className="fouder">
        <PiSealCheckFill className="check-wind"/>
        <span>Chất lượng đảm bảo bởi Wind</span>
      </div>
      <div className="free-ship">
        <span>{content.icon}</span>
        <span>{content.mesage}</span>
      </div>
    </Box>
  );
};

export default Introduce;
