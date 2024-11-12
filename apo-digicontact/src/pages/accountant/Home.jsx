// src/pages/Home.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../shared/config/axios";
import { Page, Box, Text } from "zmp-ui";
import Loading from "../shared/pages/Loading";
import BottomNavigationComponent from "../shared/components/BottomNavigationComponent";
import DateSelect from "./DateSelect";
import AccountsTable from "./AccountsTable";
import CurrentDate from "./CurrentDate";
import HeaderFormDate from "./HeaderFormDate";
import CustomHeader from "../shared/pages/CustomHeader";
import "../../css/accountant/tuitionfees.css";
const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { studentGuid, currentDate: initialDate, studentName } = location.state || {};
  const { currentDate, currentMonth, currentYear, setCurrentDate } =
    CurrentDate(initialDate);

  const [accounts, setAccounts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isChecked, setIsChecked] = useState({});
  const [unseenCount, setUnseenCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        let apiUrl = `api/MiniApp/GetListNotifysByDate?msgType=HP&guidStudent=${studentGuid}`;

        const year = selectedYear || currentYear;
        const month = selectedMonth || currentMonth;
        const formattedMonth = month < 10 ? `0${month}` : month.toString();

        apiUrl += `&month=${formattedMonth}&year=${year}`;

        const response = await axiosClient.get(apiUrl);
        setAccounts(response.data.data.reverse());
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bảng điểm:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccount();
  }, [studentGuid, selectedMonth, selectedYear, currentMonth, currentYear]);

  return (
    <Page className="page-tuitionfees">
      <CustomHeader title={"Phiếu thu học phí"} />
      <Box className="box-header-app">
        <HeaderFormDate
          image={"./images/icon/icon-select-date.png"}
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
          <AccountsTable accounts={accounts} isLoading={isLoading} />
        )}
      </Box>
      <BottomNavigationComponent studentGuid={studentGuid} studentName={studentName} />
    </Page>
  );
};

export default Home;
