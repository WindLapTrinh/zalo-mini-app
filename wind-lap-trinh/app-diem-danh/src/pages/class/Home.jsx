import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, List, Icon, Page } from "zmp-ui";
import CustomHeader from "../shared/pages/CustomHeader";
import ListClasses from "./ListClasses";
import "../../css/class/home.css";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { Item } = List;
  const [classList, setClassList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");

  // Hàm gọi API
  useEffect(() => {
    if (location.state && location.state.phoneNumber) {
      setPhoneNumber(location.state.phoneNumber);

    } else {
      console.error("Phone number not found in location state");
    }
    // setPhoneNumber(84368191416);
  }, [location]);

  const handleItemClick = (item) => {
    const { Guid, ClassnName } = item; // Lấy dữ liệu từ item
    navigate("/students", {
      state: { guid: Guid, className: ClassnName }, // Truyền guid và className qua state
    });
  };

  return (
    <Page className="page-student">
      <CustomHeader title={"Danh sách môn học"} showBackIcon={false} />
      <Box>
        <ListClasses
          phoneNumber={phoneNumber}
          onSelectItemClass={handleItemClick}
        />
      </Box>
    </Page>
  );
};

export default Home;
