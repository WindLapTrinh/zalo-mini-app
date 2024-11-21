import React, { useState, useEffect } from "react";
import { Page, Box } from "zmp-ui";
import { useLocation } from "react-router-dom";
import axiosClient from "../shared/config/axios";
import TimeTableList from "./TimeTableList";
import DateSelect from "./DateSelect";
import CurrentDate from "./CurrentDate";
import HeaderFormDate from "./HeaderFormDate";
import CustomHeader from "../shared/pages/CustomHeader";
import BottomNavigationComponent from "../shared/components/BottomNavigationComponent";

const Home = () => {
  const location = useLocation();
  const [timeTables, setTimeTables] = useState([]);
  const { studentGuid, currentDate: initialDate, studentName } = location.state || {};
  const { currentDate, currentMonth, currentYear, setCurrentDate } =
    CurrentDate(initialDate);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [isChecked, setIsChecked] = useState({});
  const [unseenCount, setUnseenCount] = useState(0);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    const fetchTimeTables = async () => {
      try {
        let apiUrl = `api/MiniApp/GetListNotifysByDate?msgType=TKB&guidStudent=${studentGuid}`;

        const year = selectedYear || currentYear;
        const month = selectedMonth || currentMonth;
        const formattedMonth = month < 10 ? `0${month}` : month.toString();

        apiUrl += `&month=${formattedMonth}&year=${year}`;

        const response = await axiosClient.get(apiUrl);
        setTimeTables(response.data.data.reverse());
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bảng điểm:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimeTables();
  }, [studentGuid, selectedMonth, selectedYear, currentMonth, currentYear]);

  return (
    <Page className="page-timetable">
      <CustomHeader title={"Thời khóa biểu"}/>
      <Box className="box-header-app">
        <HeaderFormDate
          image={"./images/icon/icon-oclock.png"}
          title={"Chọn mốc thời gian"}
        />
        <DateSelect
          currentMonth={currentMonth}
          currentYear={currentYear}
          setSelectedMonth={setSelectedMonth}
          setSelectedYear={setSelectedYear}
        />
        <HeaderFormDate
          title={"Danh sách thời khóa biểu"}
          image={"./images/icon/icon-timetable.png"}
        />
      </Box>
      <Box>
        <TimeTableList timeTables={timeTables} />
      </Box>
      <BottomNavigationComponent studentGuid={studentGuid} studentName={studentName} />
    </Page>
  );
};

export default Home;
