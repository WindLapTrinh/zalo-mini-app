import React from "react";
import { Box, Text, Icon } from "zmp-ui";
import { BsPatchCheck } from "react-icons/bs";
import { FaRegCreditCard } from "react-icons/fa6";
import { BsCoin } from "react-icons/bs";
import "../../css/user/listfunction.css"; // Đường dẫn đến file CSS

const functions = [
  {
    id: 1,
    title: "Khách hàng thân thiết",
    description: "Thành viên bạc",
    icon: <BsPatchCheck />
  },
  {
    id: 2,
    title: "Số dư TK Wind",
    description: "",
    icon: <FaRegCreditCard />
  },
  {
    id: 3,
    title: "Wind Xu",
    description: "Nhấn để nhận xu mỗi ngày!",
    icon: <BsCoin />
  }
];

const ListFunction = () => {
  return (
    <Box className="list-function-page">
      {functions.map((func) => (
        <Box key={func.id} className="function-item">
          <Box className="function-left">
            <Box className={
                func.title === "Wind Xu"? "icon-list-func-coin": "icon-function-item"
              }>
                {func.icon}
            </Box>
            <Text className="function-title">{func.title}</Text>
          </Box>
          <Box className="function-right">
            <Text className="function-description">{func.description}</Text>
            <Icon className="icon-right" icon="zi-chevron-right" />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ListFunction;
