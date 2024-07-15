import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Payment } from "zmp-sdk";
import { Page, Box, Modal, useNavigate, Icon, List, Button } from "zmp-ui";
import { configAppView } from "zmp-sdk/apis";
import * as dateFns from "date-fns";
const { format } = dateFns;

import "../css/listbill.css";
import "../css/detailHome.css";
import { axiosClient } from "../configs/axios";

const { Item } = List;

//style  để định dạng cặp thông tin
const pairStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "-15px",
};

const Notification = ({ tasks, props }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedReg, setSelectedReg] = useState(null);

  const { studentGuid, studentName } = location.state || {};
  console.log("StudenGuiId:", studentGuid);
  const [regs, setRegs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isChecked, setIsChecked] = useState({});
  const [unseenCount, setUnseenCount] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Gọi API configAppView để cấu hình giao diện ứng dụng
    configAppView({
      headerColor: "#8861bb",
      statusBarColor: "#8861bb",
      headerTextColor: "white",
      hideAndroidBottomNavigationBar: true,
      hideIOSSafeAreaBottom: true,
      actionBar: {
        title: "Đăng ký",
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
    const fetchReg = async () => {
      try {
        const response = await axios.get(
          `https://ileader.cloud/api/MiniApp/GetListNotifys?msgType=ĐK&guidStudent=${studentGuid}`
        );

        // Cập nhật trạng thái với danh sách hóa đơn từ API
        setRegs(response.data.data.reverse());
      } catch (error) {
        console.error("Lỗi khi lấy danh sách kế toán:", error);
      }
    };
    // Gọi hàm để lấy danh sách hóa đơn
    fetchReg();
  }, [studentGuid]);

  // Hàm định dạng ngày thành "dd/MM/yyyy"
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const parsedDate = new Date(dateString);
    return format(parsedDate, "dd/MM/yyyy");
  };

  const formatRegInfo = (regs) => {
    const parsedJsonContent = JSON.parse(regs.jsonContent || "{}");
    console.log("Account object:", regs);

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
        label: "Mã phiếu",
        value: parsedJsonContent.Id ?? parsedJsonContent.Id,
      },
      {
        label: "Ngày đăng ký",
        value: formatDate(parsedJsonContent.RegisterDate),
      },
      {
        label: "Mã học viên",
        value: parsedJsonContent.StudentId ?? parsedJsonContent.StudentId,
      },
      {
        label: "Họ tên",
        value: parsedJsonContent.StudentName ?? parsedJsonContent.StudentName,
      },
      {
        label: "Người tạo",
        value: parsedJsonContent.EmployeeName ?? parsedJsonContent.EmployeeName,
      },
      {
        label: "Tổng hóa đơn",
        value: formatCurrency(
          parsedJsonContent.Paid ?? parsedJsonContent.TotalBill
        ),
      },

      {
        label: "Thanh toán",
        value: formatCurrency(parsedJsonContent.Paid ?? parsedJsonContent.Paid),
      },
      {
        label: "Còn nợ",
        value: formatCurrency(
          parsedJsonContent.Remaining ?? parsedJsonContent.Remaining
        ),
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
  //Notice
  // Tạo một hàm để đếm số lượng thông báo chưa đọc
  const countUnseen = () => {
    const unseenRegs = regs.filter((reg) => !isChecked[reg.guid]);
    setUnseenCount(unseenRegs.length);
  };
  useEffect(() => {
    countUnseen();
  }, [regs, isChecked]);
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
  const handleItemClick = (reg) => {
    const newIsChecked = { ...isChecked };
    const currentState = isChecked[reg.guid];
    const newCheckedState =
      currentState === undefined || currentState === false ? true : true;

    newIsChecked[reg.guid] = newCheckedState;

    if (!newCheckedState) {
      // Nếu trạng thái là false (chưa được xem), giảm biến đếm đi 1
      setUnseenCount((prevCount) => prevCount - 1);
    } else {
      // Nếu trạng thái là true (đã được xem), tăng biến đếm lên 1
      setUnseenCount((prevCount) => prevCount + 1);
    }

    saveCheckedState(newIsChecked, () => {
      setModalVisible(true);
      setSelectedReg(reg);
      // Gửi trạng thái checked lên server khi thông báo được click
      sendCheckedStateToServer(reg.guid, newCheckedState);
      countUnseen(); // Gọi lại hàm đếm số lượng thông báo chưa đọc
    });
  };
  //end notyfy

  //Thanh toán

  // Function để tạo mac

  //endd mac
  const handlePayment = async () => {
    const formatCurrency = (value) => {
      if (value === undefined || value === null) return "";
      // Ép kiểu tiền tệ Việt Nam đồng
      return value.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    };
    if (selectedReg) {
      // Trích xuất các thông tin cần thiết từ thông báo đã chọn
      const parsedJsonContent = JSON.parse(selectedReg.jsonContent || "{}");
      const payId = parsedJsonContent.Guid;
      const remainingAmount = parsedJsonContent.Remaining;
      const dateReg = formatDate(parsedJsonContent.RegisterDate);

      console.log("id thanh toan", payId);
      console.log("so tien thanh toan", remainingAmount);
      // Tạo yêu cầu thanh toán với các thông tin trích xuất
      Payment.createOrder({
        desc: `Học viên ${studentName} thanh toán - phiếu đăng ký ngày ${dateReg} - còn nợ ${formatCurrency(
          remainingAmount
        )}`,
        item: [{ id: payId, amount: remainingAmount }],
        id: payId,
        amount: remainingAmount,
        extradata: {
          storeName: studentName,
          storeId: id,
          orderGroupId: orderId,
          myTransactionId: "2388317336306541214",
          notes: desc,
        },
        success: async (data) => {
          // Tạo đơn hàng thành công
          // Hệ thống tự động chuyển sang trang thanh toán.
          const { orderId } = data;
          console.log(orderId);

          //đẩy lên server
          //server
          try {
            // &guid=${id}&money=${amount}
            const res = await axiosClient.post(
              `RegisterForm/MiniAppPay?&guid=${id}&money=${amount}`
            );
            console.log("dữ liệu success", res);
          } catch (error) {
            console.error("kết nối server không thành công:", error);
          }
        },
        fail: (err) => {
          // Tạo đơn hàng lỗi
          console.log(err);
        },
      });
    }
    console.log("Click");
  };
  //end pay

  //date
  const handleClickDate = () => {
    const newCurrentDate = new Date();
    setCurrentDate(newCurrentDate);
    console.log("Ngày hiện tại đã chọn:", newCurrentDate);
    navigate("/datereg", {
      state: { studentGuid, currentDate: newCurrentDate, studentName },
    });
  };
  //end date

  return (
    <Page className="section-container">
      {regs.length === 0 ? (
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
          <div className="text-student">
            {" "}
            Hiện đang không có thông tin đăng ký nào?
          </div>
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
          {regs.map((reg) => (
            <Item
              key={reg.guid}
              title={reg.title}
              prefix={<Icon icon="zi-calendar" />}
              suffix={<Icon icon="zi-chevron-right" />}
              onClick={() => handleItemClick(reg)}
              className={isChecked[reg.guid] ? "checked" : ""}
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
            text: "Thanh toán",
            onClick: () => handlePayment(),
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
          {selectedReg && (
            <React.Fragment>
              {formatRegInfo(selectedReg)
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
