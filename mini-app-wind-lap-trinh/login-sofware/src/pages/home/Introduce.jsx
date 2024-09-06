import React, { useState, useEffect } from "react";
import { Box } from "zmp-ui";
import { BsShieldFillCheck } from "react-icons/bs";
import { FaTruck } from "react-icons/fa";
import { GoClockFill } from "react-icons/go";
import { BsStripe } from "react-icons/bs";
import "../../css/detailhome/infroduce.css";

const Introduce = () => {
  const [content, setContent] = useState({
    mesage:"Miễn phí vận chuyển",
    icon: <FaTruck/>
  });

  useEffect(() => {
    const messages = [
      {mesage:"Miễn phí vận chuyển", icon: <FaTruck/>},
      {mesage:"Nay mua, mai nhận",icon:<GoClockFill/>},
      {mesage:"Miễn phí giao hàng 0đ",icon:<FaTruck/>},
      {mesage:"Hoàn tiền ngay nếu hàng lỗi", icon: <BsStripe/>}
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
        <BsShieldFillCheck />
        <span>Chất lượng đảm bảo bởi SLK</span>
      </div>
      <div className="free-ship">
        <span>{content.icon}</span>
        <span>{content.mesage}</span>
      </div>
    </Box>
  );
};

export default Introduce;
