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
  Button,
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

  const { studentGuid } = location.state || {};
  console.log("StudenGuiId:", studentGuid);

  const [accounts, setAccounts] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isChecked, setIsChecked] = useState({});
  const [unseenCount, setUnseenCount] = useState(0); // Biến đếm số lượng thông báo chưa được xem
  const [currentDate, setCurrentDate] = useState(new Date()); // State để lưu ngày hiện tại

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
  }, []);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await axios.get(
          `https://ileader.cloud/api/MiniApp/GetListNotifys?msgType=HP&guidStudent=${studentGuid}`
        );

        // Cập nhật trạng thái với danh sách hóa đơn từ API
        setAccounts(response.data.data.reverse());
      } catch (error) {
        console.error("Lỗi khi lấy danh sách kế toán:", error);
      }
    };
    // Gọi hàm để lấy danh sách hóa đơn
    fetchAccount();
  }, [studentGuid]);

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
        `https://ileader.cloud/api/MiniApp/CheckSeen?guid=${regGuid}&check=${checkedState}`,
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

  //date
  const handleClickDate = () => {
    const newCurrentDate = new Date(); // Tạo một ngày mới
    setCurrentDate(newCurrentDate); // Cập nhật state currentDate với ngày mới
    console.log("Ngày hiện tại đã chọn:", newCurrentDate); // In ra ngày hiện tại sau khi cập nhật
    navigate("/dateaccount", {
      state: { studentGuid, currentDate: newCurrentDate },
    }); // Truyền currentDate vào navigate
  };

  return (
    <Page className="section-container">
      {accounts.length === 0 ? (
        <div>
          <Box mt={5} mb={5}>
            <Button
              className="btn-scorses"
              onClick={handleClickDate}
              size="large"
            >
              Xem tất cả
            </Button>
          </Box>
          <div className="text-student"> Hiện tại không có thông báo học phí mới ?</div>
        </div>
      ) : (
        <List>
          <Box mt={5} mb={5}>
            <Button
              className="btn-scorses"
              onClick={handleClickDate}
              size="large"
            >
              Xem tất cả
            </Button>
          </Box>
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
