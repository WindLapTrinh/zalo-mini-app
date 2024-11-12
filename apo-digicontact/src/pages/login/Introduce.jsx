import React, { useState, useEffect } from "react";
import { Box } from "zmp-ui";
import { BsPatchCheckFill } from "react-icons/bs";
import { BsAwardFill } from "react-icons/bs";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { MdPayments } from "react-icons/md";
import { BsRocketTakeoffFill } from "react-icons/bs";
import "../../css/login/infroduce.css";

const Introduce = () => {
  const [content, setContent] = useState({
    mesage:"Cùng con học tập",
    icon: <BsRocketTakeoffFill/>
  });

  useEffect(() => {
    const messages = [
      {mesage:"Cùng con học tập", icon: <BsRocketTakeoffFill/>},
      {mesage:"Chat nhanh với trung tâm", icon: <IoChatbubbleEllipses/>},
      {mesage:"Thanh toán online",icon:<MdPayments/>},
      {mesage:"Tiện ích cho phụ huynh",icon:<BsAwardFill/>}
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
        <BsPatchCheckFill />
        <span>Phần mềm</span>
        <img className="image-fouder" src="/images/icon/logo.png"/>
      </div>
      <div className="free-ship">
        <span>{content.icon}</span>
        <span>{content.mesage}</span>
      </div>
    </Box>
  );
};

export default Introduce;
