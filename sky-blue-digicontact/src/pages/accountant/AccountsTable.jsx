import React, { useState } from "react";
import { Box, Select, Text, Modal } from "zmp-ui";
import { formatDate, formatCurrency } from "../shared/utils/formatUtils";
import HeaderFormDate from "./HeaderFormDate";
import axiosClient from "../shared/config/axios";
import { GoDotFill } from "react-icons/go";
import "../../css/accountant/tuitionfees.css";

const AccountsTable = ({ accounts, isLoading }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleCheck, setModalVisibleCheck] = useState(false);

  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedAccountCheck, setSelectedAccountCheck] = useState(null);

  const pairStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "-15px",
  };

  const handleRowClick = (account) => {
    setSelectedAccount(account);
    setModalVisible(true);
  };

  const formatAccountNote = (account) => {
    const parsedJsonContent = account || "{}";
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
  const formatItemCheck = (account) => {
    const parsedJsonContent = account || "{}";
    const infoPairs = [
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
          parsedJsonContent.FormsOfPayment ?? parsedJsonContent.FormsOfPayment
        ,
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
  const sendCheckedStateToServer = async (account) => {
    try {
      await axiosClient.post(
        `api/MiniApp/CheckSeen?guid=${account.guid}&check=true`
      );
      console.log("Đã gửi trạng thái seen lên server thành công");
    } catch (error) {
      console.error("Lỗi khi gửi trạng thái seen lên server:", error);
    }
  };
  const handleItemCheck = (account) => {
    if (account.seen === false) {
      sendCheckedStateToServer(account);
      account.seen = true;
    }
    const parsedJsonContent = JSON.parse(account.jsonContent || "{}");

    setSelectedAccountCheck(parsedJsonContent);
    setModalVisibleCheck(true);
  };
  return (
    <Box>
      <HeaderFormDate
        image={"./images/icon/icon-book.png"}
        title={"Danh sách phiếu thu"}
      />
      <div className="table-container">
        <table className="custom-table">
          <thead className="title-custom-table">
            <tr>
              <th>Mã phiếu</th>
              <th>Ngày thu</th>
              <th>Thanh toán</th>
              <th>Ví tiền</th>
              <th>Tổng thu</th>
              <th>Hình thức thanh toán</th>
              <th>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && accounts.length > 0 ? (
              accounts.map((account, index) => {
                const parsedJsonContent = JSON.parse(
                  account.jsonContent || "{}"
                );
                return (
                  <tr key={index}>
                    <td onClick={() => handleItemCheck(account)}>
                      {account.seen === false ? (
                        <div className="notify-check">
                          <GoDotFill className="text-red"/>
                          <span>{parsedJsonContent.Id || <td>N/A</td>}</span>
                        </div>
                      ) : (
                        parsedJsonContent.Id || <td>N/A</td>
                      )}
                    </td>
                    <td>{formatDate(parsedJsonContent.DateCreated)}</td>
                    <td>{formatCurrency(parsedJsonContent.Abate)}</td>
                    <td>{formatCurrency(parsedJsonContent.Purse)}</td>
                    <td>{formatCurrency(parsedJsonContent.TotalBill)}</td>
                    <td>{parsedJsonContent.FormsOfPayment || <td>N/A</td>}</td>
                    {parsedJsonContent.Note ? (
                      <td onClick={() => handleRowClick(parsedJsonContent)}>
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
                <td colSpan="7" className="text-student">
                  Hiện tại không có thông tin học phí nào?
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Modal
        visible={modalVisible}
        title="Ghi chú"
        onClose={() => setModalVisible(false)}
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
          {selectedAccount && (
            <React.Fragment>
              {formatAccountNote(selectedAccount).map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </React.Fragment>
          )}
        </Box>
      </Modal>

      {/* modal item check  */}
      <Modal
        visible={modalVisibleCheck}
        title="Chi tiết phiếu thu"
        onClose={() => setModalVisibleCheck(false)}
        zIndex={1200}
        actions={[
          {
            text: "Đã hiểu",
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
          {selectedAccountCheck && (
            <React.Fragment>
              {formatItemCheck(selectedAccountCheck).map((line, index) => (
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

export default AccountsTable;
