import React, { useState } from "react";
import { Box, Select, Text, Swiper, Modal } from "zmp-ui";
import { formatDate, formatCurrency } from "../shared/utils/formatUtils";
import HeaderFormDate from "./HeaderFormDate";
import { GoDotFill } from "react-icons/go";
import axiosClient from "../shared/config/axios";
import parse from "html-react-parser";

const RollcallsTable = ({ rollcalls, isLoading }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleNote, setModalVisibleNote] = useState(false);
  const [modalVisibleCheck, setModalVisibleCheck] = useState(false);
  const [selectedRollCall, setSelectedRollCall] = useState(null);
  const [selectedRollCallNote, setSelectedRollCallNote] = useState(null);
  const [selectedRollCallCheck, setSelectedRollCallCheck] = useState(null);

  const handleRowClick = (rollcall) => {
    setSelectedRollCall(rollcall);
    setModalVisible(true);
  };

  const handleShowNoteClick = (rollcall) => {
    setSelectedRollCallNote(rollcall);
    setModalVisibleNote(true);
  };

  const formatRollCallImage = (rollcall) => {
    const detailsRollCalls = JSON.parse(rollcall?.jsonContent || "{}");
    const imageArray = detailsRollCalls?.[0]?.Image || [];

    if (!imageArray.length) return "N/A";

    return (
      <Swiper autoplay={true}>
        {imageArray.map((imageSrc, imgIndex) => (
          <Swiper.Slide key={imgIndex}>
            <img
              className="slide-img"
              src={"https://demo-x.ileader.vn" + imageSrc}
              alt={`slide-${imgIndex + 1}`}
            />
          </Swiper.Slide>
        ))}
      </Swiper>
    );
  };

  const formatRollCallNote = (rollcall) => {
    const detailsRollCalls = JSON.parse(rollcall?.jsonContent || "{}");
    const noteContent = detailsRollCalls[0]?.Note ?? "N/A";

    return (
      <div>
        <span>{parse(noteContent)}</span>
      </div>
    );
  };

  const sendCheckedStateToServer = async (rollcall) => {
    try {
      await axiosClient.post(
        `api/MiniApp/CheckSeen?guid=${rollcall.guid}&check=true`
      );
      console.log("Đã gửi trạng thái seen lên server thành công");
    } catch (error) {
      console.error("Lỗi khi gửi trạng thái seen lên server:", error);
    }
  };

  const handleRollCallCheck = (rollcall) => {
    if (rollcall.seen === false) {
      sendCheckedStateToServer(rollcall);
      rollcall.seen = true;
    }

    setSelectedRollCallCheck(rollcall);
    setModalVisibleCheck(true);
  };

  return (
    <Box>
      <HeaderFormDate
        image={"./images/icon/icon-receipts.png"}
        title={"Bảng điểm danh"}
      />
      <div className="table-container">
        <table className="custom-table">
          <thead className="title-custom-table">
            <tr>
              <th>Ngày</th>
              <th>Trạng thái</th>
              <th>Nhận xét</th>
              <th>Hình ảnh</th>
              <th>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && rollcalls.length > 0 ? (
              rollcalls.map((rollcall, index) => {
                const parsedJsonContent = rollcall || "{}";
                const detailsRollCalls = JSON.parse(
                  parsedJsonContent.jsonContent || "{}"
                );
                console.log(detailsRollCalls);
                return (
                  <tr key={index}>
                    <td onClick={() => handleRollCallCheck(parsedJsonContent)}>
                      {parsedJsonContent.seen === false ? (
                        <div className="notify-check">
                          <GoDotFill className="text-red"/>
                          <span>{parsedJsonContent.title.slice(16, 27)}</span>
                        </div>
                      ) : (
                        parsedJsonContent.title.slice(16, 27)
                      )}
                    </td>
                    <td>{detailsRollCalls[0]?.Status || "N/A"}</td>
                    <td>{detailsRollCalls[0]?.CriteriaName || "N/A"}</td>
                    {detailsRollCalls[0].Image != null ? (
                      <td onClick={() => handleRowClick(parsedJsonContent)}>
                        Xem
                      </td>
                    ) : (
                      <td>N/A</td>
                    )}
                    <td onClick={() => handleShowNoteClick(parsedJsonContent)}>
                      {detailsRollCalls[0].Note != null ? parse("Xem") : "N/A"}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="text-student">
                  Hiện tại không có thông tin điểm danh nào?
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Modal
        visible={modalVisible}
        title="Hình ảnh"
        onClose={() => setModalVisible(false)}
        zIndex={1200}
        actions={[
          {
            text: "Đã xem",
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
          {selectedRollCall && formatRollCallImage(selectedRollCall)}
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
          <Box className="space-y-4 item-model-main">
            {selectedRollCallNote && formatRollCallNote(selectedRollCallNote)}
          </Box>
        </Box>
      </Modal>

      {/* Modal hiển thị thông tin chi tiết */}
      <Modal
        visible={modalVisibleCheck}
        title="Chi tiết điểm danh"
        onClose={() => setModalVisibleCheck(false)}
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
      >
        <Box className="space-y-4 item-model-main">
          {selectedRollCallCheck && (
            <div>
              <div className="rollcall-check">
                <p>Ngày</p>
                <p>{selectedRollCallCheck.title.slice(16, 27)}</p>
              </div>
              <div className="rollcall-check">
                <p>Trạng thái</p>
                <p>
                  {JSON.parse(selectedRollCallCheck.jsonContent)[0]?.Status ||
                    "N/A"}
                </p>
              </div>
              <div className="rollcall-check mb-rollcall">
                <p>Nhận xét</p>
                <p>
                  {JSON.parse(selectedRollCallCheck.jsonContent)[0]
                    ?.CriteriaName || "N/A"}
                </p>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default RollcallsTable;
