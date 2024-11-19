import React, { useState } from "react";
import { Box, Modal } from "zmp-ui";
import { formatDate, formatCurrency } from "../shared/utils/formatUtils";
import HeaderFormDate from "./HeaderFormDate";
import usePayment from "../shared/hooks/usePayment";
import { GoDotFill } from "react-icons/go";
import axiosClient from "../shared/config/axios";

const RegisterTable = ({ registers, isLoading }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleNote, setModalVisibleNote] = useState(false);
  const [selectedReg, setSelectedReg] = useState(null);
  const [selectedRegNote, setSelectedRegNote] = useState(null);

  const { handlePayment } = usePayment();
  const handleRowClick = (register) => {
    if (register.seen === false) {
      sendCheckedStateToServer(register);
      register.seen = true;
    }
    const parsedJsonContent = JSON.parse(register.jsonContent || "{}");

    setSelectedReg(parsedJsonContent);
    setModalVisible(true);
  };
  const pairStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "-15px",
  };

  const formatRegInfo = (register) => {
    const parsedJsonContent = register || "{}";
    const infoPairs = [
      {
        label: "Ngày đăng ký",
        value: formatDate(parsedJsonContent.RegisterDate),
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
          parsedJsonContent.TotalBill ?? parsedJsonContent.TotalBill
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

  const handeShowNote = (register) => {
    setSelectedRegNote(register);
    setModalVisibleNote(true);
  };
  const formatRegNote = (register) => {
    const parsedJsonContent = register || "{}";
    const infoPairs = [
      {
        value: parsedJsonContent.Note ?? "N/A",
      },
    ];

    return infoPairs.map((pair, index) => (
      <div key={index}>
        <span>{pair.value}</span>
      </div>
    ));
  };

  const sendCheckedStateToServer = async (register) => {
    try {
      await axiosClient.post(
        `api/MiniApp/CheckSeen?guid=${register.guid}&check=true`
      );
      console.log("Đã gửi trạng thái seen lên server thành công");
    } catch (error) {
      console.error("Lỗi khi gửi trạng thái seen lên server:", error);
    }
  };

  return (
    <Box>
      <HeaderFormDate
        image={"./images/icon/icon-receipts.png"}
        title={"Danh sách phiếu đăng ký"}
      />
      <div className="table-container">
        <table className="custom-table">
          <thead className="title-custom-table">
            <tr>
              <th>Mã phiếu</th>
              <th>Ngày đăng ký</th>
              <th>Họ tên</th>
              <th>Người tạo</th>
              <th>Tổng hóa đơn</th>
              <th>Thanh toán</th>
              <th>Còn nợ</th>
              <th>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && registers.length > 0 ? (
              registers.map((register, index) => {
                const parsedJsonContent = JSON.parse(
                  register.jsonContent || "{}"
                );
                return (
                  <tr key={index}>
                    <td onClick={() => handleRowClick(register)}>
                      {register.seen === false ? (
                        <div className="notify-check">
                          <GoDotFill className="text-red" />
                          <span> {parsedJsonContent.Id || "N/A"}</span>
                        </div>
                      ) : (
                        parsedJsonContent.Id || "N/A"
                      )}
                    </td>
                    <td onClick={() => handleRowClick(register)}>
                      {formatDate(parsedJsonContent.DateCreated)}
                    </td>
                    <td onClick={() => handleRowClick(register)}>
                      {parsedJsonContent.StudentName || "N/A"}
                    </td>
                    <td onClick={() => handleRowClick(register)}>
                      {parsedJsonContent.EmployeeName || "N/A"}
                    </td>
                    <td onClick={() => handleRowClick(register)}>
                      {formatCurrency(parsedJsonContent.TotalBill)}
                    </td>
                    <td onClick={() => handleRowClick(register)}>
                      {formatCurrency(parsedJsonContent.Paid)}
                    </td>
                    <td onClick={() => handleRowClick(register)}>
                      {formatCurrency(parsedJsonContent.Remaining)}
                    </td>
                    {parsedJsonContent.Note != null ? (
                      <td onClick={() => handeShowNote(parsedJsonContent)}>
                        Xem
                      </td>
                    ) : (
                      <td>N/A</td>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="text-student">
                  Hiện tại không có thông tin đăng ký nào?
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Modal
        visible={modalVisible}
        title="Thanh toán online"
        onClose={() => setModalVisible(false)}
        zIndex={1200}
        actions={[
          {
            text: "Đồng ý",
            // onClick: () => handlePayment(selectedReg)
            close: true,
          },
          {
            text: "Hủy",
            close: true,
            danger: true,
          },
        ]}
        description=""
      >
        <Box className="space-y-4 item-model-main">
          {selectedReg && (
            <React.Fragment>
              {formatRegInfo(selectedReg).map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </React.Fragment>
          )}
        </Box>
      </Modal>
      <Modal
        visible={modalVisibleNote}
        title="Ghi chú"
        onClose={() => setModalVisibleNote(false)}
        zIndex={1200}
        actions={[
          {
            text: "Đã hiểu",
            close: true,
          },
          {
            text: "Thoát",
            close: true,
            danger: true,
          },
        ]}
        description=""
      >
        <Box className="space-y-4 item-model-main">
          {selectedRegNote && (
            <React.Fragment>
              {formatRegNote(selectedRegNote).map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </React.Fragment>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default RegisterTable;
