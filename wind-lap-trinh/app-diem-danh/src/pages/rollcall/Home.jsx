// src/pages/Home.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../shared/config/axios";
import { Page, Box, Text } from "zmp-ui";
import Loading from "../shared/pages/Loading";
import BottomNavigationComponent from "../shared/components/BottomNavigationComponent";
import DateSelect from "./DateSelect";
import RollCallsTable from "./RollCallsTable";
import CurrentDate from "./CurrentDate";
import HeaderFormDate from "./HeaderFormDate";
import CustomHeader from "../shared/pages/CustomHeader";
import "../../css/accountant/tuitionfees.css";
const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { studentGuid, currentDate: initialDate, studentName } = location.state || {};
  console.log(studentGuid);
  const { currentDate, currentMonth, currentYear, setCurrentDate } =
    CurrentDate(initialDate);

  const [rollcalls, setRollcalls] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isChecked, setIsChecked] = useState({});
  const [unseenCount, setUnseenCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    const fetchRollcalls = async () => {
      try {
        let apiUrl = `api/MiniApp/GetListNotifysByDate?msgType=ĐD-NX&guidStudent=${studentGuid}`;

        const year = selectedYear || currentYear;
        const month = selectedMonth || currentMonth;
        const formattedMonth = month < 10 ? `0${month}` : month.toString();

        apiUrl += `&month=${formattedMonth}&year=${year}`;

        const response = await axiosClient.get(apiUrl);
        setRollcalls(response.data.data.reverse());
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bảng điểm:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRollcalls();
  }, [studentGuid, selectedMonth, selectedYear, currentMonth, currentYear]);

  return (
    <Page className="page-tuitionfees">
      <CustomHeader title={"Điểm danh"} />
      <Box className="box-header-app">
        <HeaderFormDate
          image={"./images/icon/icon-oclock.png"}
          title={"Chọn mốc thời gian"}
        />
      </Box>
      <DateSelect
        currentMonth={currentMonth}
        currentYear={currentYear}
        setSelectedMonth={setSelectedMonth}
        setSelectedYear={setSelectedYear}
      />
      <Box className="header-tuitionfees">
        {isLoading ? (
          <Loading />
        ) : (
          <RollCallsTable rollcalls={rollcalls} isLoading={isLoading} />
        )}
      </Box>
      <BottomNavigationComponent studentGuid={studentGuid} studentName={studentName} />
    </Page>
  );
};

export default Home;
