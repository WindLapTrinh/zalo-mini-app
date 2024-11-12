import React, { useState, useEffect } from "react";
import { Page, Box } from "zmp-ui";
import { useNavigate, useLocation } from "react-router-dom";
import ListStudents from "./ListStudents";
import CustomHeader from "../shared/pages/CustomHeader";
import "../../css/student/home.css";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (location.state && location.state.phoneNumber) {
      setPhoneNumber(location.state.phoneNumber);

    } else {
      console.error("Phone number not found in location state");
    }
    // setPhoneNumber(84368191416);
  }, [location]);

  const handleItemClick = (student) => {
    const { student_FullName, studentGuid } = student;
    navigate("/home", {
      state: { studentName: student_FullName, studentGuid, phoneNumber },
    });
  };

  return (
    <Page className="page-student">
      <CustomHeader title={"Danh sách học viên"} showBackIcon={false} />
      <Box>
        <ListStudents
          phoneNumber={phoneNumber}
          onSelectStudent={handleItemClick}
        />
      </Box>
    </Page>
  );
};

export default Home;
