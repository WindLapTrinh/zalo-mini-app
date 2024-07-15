import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Page,
  Text,
  Box,
  Modal,
  useNavigate,
  Icon,
  List,
  Select,
} from "zmp-ui";
import { configAppView } from "zmp-sdk/apis";
const { Item } = List;
import * as dateFns from "date-fns";
const { format } = dateFns;
import "../css/listbill.css";
import "../css/detailHome.css";

const pairStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "-15px",
};

const Notification = ({ tasks, props }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { studentGuid, currentDate } = location.state || {};
  console.log("StudenGuiId:", studentGuid);
  console.log("Nam hien tai la:", currentDate);

  const [accounts, setAccounts] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isChecked, setIsChecked] = useState({});
  const [unseenCount, setUnseenCount] = useState(0); // Biến đếm số lượng thông báo chưa được xem
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  // Thêm biến state mới để lưu năm hiện tại
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, serCurrentMonth] = useState(currentDate.getMonth() + 1);

  useEffect(() => {
    // Gọi API configAppView để cấu hình giao diện ứng dụng
    configAppView({
      headerColor: "#8861bb",
      statusBarColor: "#8861bb",
      headerTextColor: "white",
      hideAndroidBottomNavigationBar: true,
      hideIOSSafeAreaBottom: true,
      actionBar: {
        title: "Học phí",
        leftButton: "back",
      },
      success: (res) => {
        // Xử lý khi gọi API thành công
        console.log("Goi thanh cong");
      },
      fail: (error) => {
        // Xử lý khi gọi API thất bại
        console.log(error);
      },
    });
    // Tính toán và lưu năm hiện tại vào biến state
    setCurrentYear(new Date().getFullYear());
    serCurrentMonth(new Date().getMonth() + 1);
  }, []);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        let apiUrl = `https://ileader.cloud/api/MiniApp/GetListNotifysByDate?msgType=HP&guidStudent=${studentGuid}`;

        if (currentDate) {
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth() + 1;
          const formattedYear = year.toString();
          const formattedMonth = month < 10 ? `0${month}` : month.toString();
          apiUrl += `&month=${formattedMonth}&year=${formattedYear}`;
          console.log(apiUrl);
        }

        if (currentDate || (currentMonth && currentYear)) {
          apiUrl = `https://ileader.cloud/api/MiniApp/GetListNotifysByDate?msgType=HP&guidStudent=${studentGuid}&month=${currentMonth}&year=${currentYear}`;
          console.log(apiUrl);
        }
        if (selectedMonth && selectedYear) {
          apiUrl = `https://ileader.cloud/api/MiniApp/GetListNotifysByDate?msgType=HP&guidStudent=${studentGuid}&month=${selectedMonth}&year=${selectedYear}`;
          console.log(apiUrl);
        } else if (selectedMonth || selectedYear == null) {
          if (selectedMonth != null) {
            apiUrl = `https://ileader.cloud/api/MiniApp/GetListNotifysByDate?msgType=HP&guidStudent=${studentGuid}&month=${selectedMonth}&year=${currentYear}`;
            console.log(apiUrl);
          } else {
            apiUrl = `https://ileader.cloud/api/MiniApp/GetListNotifysByDate?msgType=HP&guidStudent=${studentGuid}&month=${currentMonth}&year=${currentYear}`;
            console.log(apiUrl);
          }
        } else {
          if(selectedYear != null){
            apiUrl = `https://ileader.cloud/api/MiniApp/GetListNotifysByDate?msgType=HP&guidStudent=${studentGuid}&month=${currentMonth}&year=${selectedYear}`;
          console.log(apiUrl);
          }else{
            apiUrl = `https://ileader.cloud/api/MiniApp/GetListNotifysByDate?msgType=HP&guidStudent=${studentGuid}&month=${currentMonth}&year=${currentYear}`;
            console.log(apiUrl);
          }
        }

        const response = await axios.get(apiUrl);
        setAccounts(response.data.data.reverse());
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bảng điểm:", error);
      }
    };
    // Gọi hàm để lấy danh sách hóa đơn
    fetchAccount();
  }, [studentGuid, currentDate, selectedMonth, selectedYear]);

  const formatAccountInfo = (accounts) => {
    const parsedJsonContent = JSON.parse(accounts.jsonContent || "{}");
    console.log("Account object:", accounts);

    // Hàm định dạng ngày thành "dd/MM/yyyy"
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const parsedDate = new Date(dateString);
      return format(parsedDate, "dd/MM/yyyy");
    };

    const formatCurrency = (value) => {
      if (value === undefined || value === null) return "";
      // Ép kiểu tiền tệ Việt Nam đồng
      return value.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    };

    const infoPairs = [
      {
        label: "Mã phiếu đăng ký",
        value: parsedJsonContent.RegisterId ?? parsedJsonContent.RegisterId,
      },
      {
        label: "Mã phiếu thu",
        value: parsedJsonContent.Id ?? parsedJsonContent.Id,
      },
      {
        label: "Ngày thu",
        value: formatDate(parsedJsonContent.DateCreated),
      },
      {
        label: "Thanh toán",
        value: formatCurrency(
          parsedJsonContent.Abate ?? parsedJsonContent.Abate
        ),
      },
      {
        label: "Ví tiền",
        value: formatCurrency(
          parsedJsonContent.Purse ?? parsedJsonContent.Purse
        ),
      },
      {
        label: "Tổng thu",
        value: formatCurrency(
          parsedJsonContent.TotalBill ?? parsedJsonContent.TotalBill
        ),
      },
      {
        label: "Hình thức thanh toán",
        value:
          parsedJsonContent.FormsOfPayment ?? parsedJsonContent.FormsOfPayment,
      },
      {
        label: "Ghi chú",
        value: parsedJsonContent.Note || "N/A",
      },
    ];
    return infoPairs.map((pair, index) => (
      <div
        style={{
          ...pairStyle,
          marginBottom: index === infoPairs.length - 1 ? 0 : "-15px",
        }}
        key={index}
      >
        <span>{pair.label}:</span>
        <span>{pair.value}</span>
      </div>
    ));
  };

  // Tạo một hàm để đếm số lượng thông báo chưa đọc
  const countUnseen = () => {
    const unseenAccounts = accounts.filter(
      (account) => !isChecked[account.guid]
    );
    setUnseenCount(unseenAccounts.length);
  };

  useEffect(() => {
    countUnseen();
  }, [accounts, isChecked]);
  //Notice
  useEffect(() => {
    const loadCheckedState = () => {
      const storedCheckedState = localStorage.getItem("isChecked");
      if (storedCheckedState) {
        setIsChecked(JSON.parse(storedCheckedState));
      }
    };

    loadCheckedState();
  }, []);

  const saveCheckedState = (newState, callback) => {
    localStorage.setItem("isChecked", JSON.stringify(newState));
    setIsChecked(newState);
    if (callback) {
      callback();
    }
  };
  const sendCheckedStateToServer = async (regGuid, checkedState) => {
    try {
      // Gửi yêu cầu POST đến server để cập nhật trạng thái checked của thông báo
      await axios.post(
        `https://cap2.ileader.vn/api/MiniApp/CheckSeen?guid=${regGuid}&check=${checkedState}`,
        {
          guid: regGuid,
          checked: checkedState,
        }
      );
      console.log("Trạng thái checked đã được gửi thành công lên server");
    } catch (error) {
      console.error("Lỗi khi gửi trạng thái checked lên server:", error);
    }
  };

  // Trong hàm handleItemClick, sau khi cập nhật trạng thái checked, gọi lại hàm đếm số lượng thông báo chưa đọc
  const handleItemClick = (account) => {
    const newIsChecked = { ...isChecked };
    const currentState = isChecked[account.guid];
    const newCheckedState =
      currentState === undefined || currentState === false ? true : true;

    newIsChecked[account.guid] = newCheckedState;

    if (!newCheckedState) {
      // Nếu trạng thái là false (chưa được xem), giảm biến đếm đi 1
      setUnseenCount((prevCount) => prevCount - 1);
    } else {
      // Nếu trạng thái là true (đã được xem), tăng biến đếm lên 1
      setUnseenCount((prevCount) => prevCount + 1);
    }

    saveCheckedState(newIsChecked, () => {
      setModalVisible(true);
      setSelectedAccount(account);
      // Gửi trạng thái checked lên server khi thông báo được click
      sendCheckedStateToServer(account.guid, newCheckedState);
      countUnseen(); // Gọi lại hàm đếm số lượng thông báo chưa đọc
    });
  };
  // end Notice

  //bo loc date
  const genTestData = (name, number, prefix = "Tháng") => {
    const data = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < number; i++) {
      data.push({
        value: i + 1,
        displayName: `${prefix} ${i + 1}`,
      });
    }
    return data;
  };

  const getYear = (name, endYear, prefix = "Năm", currentYear) => {
    const data = [];
    for (let i = currentYear; i <= endYear; i++) {
      data.push({
        value: i,
        displayName: `${prefix} ${i}`,
      });
    }
    return data;
  };

  const handleOnlickGetYear = () => {
    if (selectedYear) {
      console.log("Năm đã chọn:", selectedYear);
    } else {
      console.error("Chưa chọn tháng");
    }
  };

  const handleOptionChange = (value) => {
    if (value && value.option && value.option.value) {
      const selectedMonthValue = value.option.value;
    } else {
      console.error("Không tìm thấy giá trị tháng đã chọn");
    }
  };
  //end bo loc date

  return (
    <Page className="section-container">
      <Box mt={6} pl={2}>
        <div className="form-date">
          <div className="date-left">
            <Box mt={6}>
              <Select
                label="Chọn tháng"
                placeholder="chọn tháng..."
                defaultValue={currentMonth}
                onChange={(value) => {
                  // Lưu giá trị nam đã chọn vào biến trạng thái
                  setSelectedMonth(value);
                  handleOptionChange(value);
                }}
                closeOnSelect={true}
              >
                {genTestData("key1", 12, "Tháng", currentMonth).map(
                  (option) => (
                    <Option
                      key={option.value}
                      value={option.value}
                      title={option.displayName}
                      close
                    >
                      {option.displayName}
                    </Option>
                  )
                )}
              </Select>
            </Box>
          </div>
          <div className="date-right">
            <Box mt={6}>
              <Select
                label="Chọn năm"
                placeholder="chọn năm..."
                defaultValue={currentYear}
                onChange={(value) => {
                  // Lưu giá trị nam đã chọn vào biến trạng thái
                  setSelectedYear(value);
                  handleOptionChange(value);
                }}
                closeOnSelect={true}
              >
                {getYear("key2020", 2050, "Năm", currentYear).map((option) => (
                  <Option
                    key={option.value}
                    value={option.value}
                    title={option.displayName}
                    onClick={handleOnlickGetYear}
                  >
                    {option.displayName}
                  </Option>
                ))}
              </Select>
            </Box>

            {console.log("Nam truyen qua", currentYear)}
          </div>
        </div>
      </Box>

      <Box mt={6} mb={6} pl={2}>
        <Text.Title className="title-scores">
          Danh sách thông báo học phí theo tháng
        </Text.Title>
      </Box>
      {accounts.length === 0 ? (
        <div className="text-student">
          Hiện tại không có thông tin học phí nào ?
        </div>
      ) : (
        <List>
          {accounts.map((account) => (
            <Item
              key={account.guid}
              title={account.title}
              prefix={<Icon icon="zi-calendar" />}
              suffix={<Icon icon="zi-chevron-right" />}
              onClick={() => handleItemClick(account)}
              className={isChecked[account.guid] ? "checked" : ""}
            />
          ))}
        </List>
      )}
      <Modal
        visible={modalVisible}
        title=" Thông báo"
        onClose={() => {
          setModalVisible(false);
        }}
        zIndex={1200}
        actions={[
          {
            text: "Đã hiểu",
            close: true,
          },
          {
            text: "Thoát",
            close: true,
            highLight: true,
          },
        ]}
        description=""
      >
        <Box className="space-y-4">
          {selectedAccount && (
            <React.Fragment>
              {formatAccountInfo(selectedAccount)
                .flat()
                .map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
            </React.Fragment>
          )}
        </Box>
      </Modal>
    </Page>
  );
};

export default Notification;
