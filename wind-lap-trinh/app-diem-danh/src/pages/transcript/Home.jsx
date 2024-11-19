// src/pages/Home.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Page, Box, Text } from "zmp-ui";
import SetTitleHeader from "../shared/hooks/setTitleHeader";
import Loading from "../shared/pages/Loading";
import BottomNavigationComponent from "../shared/components/BottomNavigationComponent";
import DateSelect from "./DateSelect";
import TranscriptsTable from "./TranscriptsTable";
import CurrentDate from "./CurrentDate";
import HeaderFormDate from "./HeaderFormDate";
import CustomHeader from "../shared/pages/CustomHeader";
import axiosClient from "../shared/config/axios";
import "../../css/accountant/tuitionfees.css";
const Home = () => {
  SetTitleHeader({ title: "Bảng điểm" });

  const navigate = useNavigate();
  const location = useLocation();

  const { studentGuid, currentDate: initialDate, studentName } = location.state || {};
  const { currentDate, currentMonth, currentYear, setCurrentDate } =
    CurrentDate(initialDate);

  const [transcripts, setTranscripts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isChecked, setIsChecked] = useState({});
  const [unseenCount, setUnseenCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    const fetchTranscripts = async () => {
      try {
        let apiUrl = `api/MiniApp/GetListNotifysByDate?msgType=BĐ&guidStudent=${studentGuid}`;

        const year = selectedYear || currentYear;
        const month = selectedMonth || currentMonth;
        const formattedMonth = month < 10 ? `0${month}` : month.toString();

        apiUrl += `&month=${formattedMonth}&year=${year}`;

        const response = await axiosClient.get(apiUrl);
        setTranscripts(response.data.data.reverse());
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bảng điểm:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTranscripts();
  }, [studentGuid, selectedMonth, selectedYear, currentMonth, currentYear]);

  return (
    <Page className="page-tuitionfees">
      <CustomHeader title={"Bảng điểm"}/>
      <Box className="box-header-app">
        <HeaderFormDate
          image={"./images/icon/icon-oclock-transcript.png"}
          title={"Chọn mốc thời gian"}
        />
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
            <TranscriptsTable transcripts={transcripts} isLoading={isLoading} />
          )}
        </Box>
      </Box>
      <BottomNavigationComponent studentGuid={studentGuid} studentName={studentName}/>
    </Page>
  );
};

export default Home;
