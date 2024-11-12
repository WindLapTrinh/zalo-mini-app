import React, { useState } from "react";
import { Box, Modal } from "zmp-ui";
import HeaderFormDate from "./HeaderFormDate";
import { GoDotFill } from "react-icons/go";
import axiosClient from "../shared/config/axios" 
import "../../css/accountant/transcripttable.css";

const TranscriptsTable = ({ transcripts, isLoading }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTranscript, setSelectedTranscript] = useState(null);

  const sendCheckedStateToServer = async (transcript) => {
    try {
      await axiosClient.post(
        `api/MiniApp/CheckSeen?guid=${transcript.guid}&check=true`
      );
      console.log("Đã gửi trạng thái seen lên server thành công");
    } catch (error) {
      console.error("Lỗi khi gửi trạng thái seen lên server:", error);
    }
  };

  const handleTranscript = (transcript) => {
    if (transcript.seen === false) {
      sendCheckedStateToServer(transcript);
      transcript.seen = true;
    }
    const parsedJsonContent = JSON.parse(transcript.jsonContent || "{}");
    const details = parsedJsonContent.Details || [];

    const transcriptDate = new Date(transcript.dateCreated);
    console.log("Date index item", transcriptDate);
    const comparisonDate = new Date("2024-07-10");
    const isEarlierThanComparisonDate = transcriptDate < comparisonDate;

    setSelectedTranscript({
      details: details,
      isEarlierThanComparisonDate: isEarlierThanComparisonDate,
    });
    setModalVisible(true);
  };

  // Tìm độ dài lớn nhất của ColumName
  const maxColumnWidths = transcripts.reduce((maxWidths, transcript) => {
    const details = JSON.parse(transcript.jsonContent || "{}").Details || [];
    details.forEach((detail, index) => {
      const columNameLength = detail.ColumName?.length || 0;
      maxWidths[index] = Math.max(maxWidths[index] || 0, columNameLength);
    });
    return maxWidths;
  }, []);

  return (
    <Box>
      <HeaderFormDate
        image={"./images/icon/icon-transcript.png"}
        title={"Danh sách bảng điểm"}
      />
      <div className="table-container">
        {!isLoading && transcripts.length > 0 ? (
          <table className="custom-table">
            {transcripts.map((transcript, index) => {
              const parsedJsonContent = JSON.parse(
                transcript.jsonContent || "{}"
              );
              const details = parsedJsonContent.Details || [];
              const dateItem = new Date(transcript.dateCreated);
              const comparisonDate = new Date("2024-07-10");

              if (dateItem < comparisonDate) {
                return (
                  <React.Fragment key={index}>
                    <tr>
                      <th
                        colSpan={maxColumnWidths.length}
                        onClick={() => handleTranscript(transcript)}
                      >
                        {transcript.seen === false ? (
                          <div className="notify-check">
                            <GoDotFill className="text-red" />
                            <span>
                              {parsedJsonContent.TranscriptName || "N/A"}
                            </span>
                          </div>
                        ) : (
                          parsedJsonContent.TranscriptName || "N/A"
                        )}
                      </th>
                    </tr>
                    <tr>
                      {maxColumnWidths.map((maxWidth, detailIndex) => (
                        <th
                          key={detailIndex}
                          className="item-colum-name"
                          style={{ width: `${maxWidth}ch` }}
                        >
                          {details[detailIndex]?.ColumName || "N/A"}
                        </th>
                      ))}
                    </tr>
                    <tr>
                      {maxColumnWidths.map((maxWidth, detailIndex) => (
                        <td
                          key={detailIndex}
                          style={{ width: `${maxWidth}ch` }}
                        >
                          {details[detailIndex]?.ColumnContent || "0"}
                        </td>
                      ))}
                    </tr>
                  </React.Fragment>
                );
              } else {
                return (
                  <React.Fragment key={index}>
                    <tr>
                      <th
                        colSpan={maxColumnWidths.length + 1}
                        onClick={() => handleTranscript(transcript)}
                      >
                        {transcript.seen === false ? (
                          <div className="notify-check">
                            <GoDotFill className="text-red" />
                            <span>
                              {parsedJsonContent.TranscriptName || "N/A"}
                            </span>
                          </div>
                        ) : (
                          parsedJsonContent.TranscriptName || "N/A"
                        )}
                      </th>
                    </tr>
                    <tr>
                      {maxColumnWidths.map((maxWidth, detailIndex) => (
                        <th
                          key={detailIndex}
                          className="item-colum-name"
                          style={{ width: `${maxWidth}ch` }}
                        >
                          {details[detailIndex]?.ColumName || "N/A"}
                        </th>
                      ))}
                        <th
                          style={{ width: `${Math.max(...maxColumnWidths)}ch` }}
                        >
                          Ghi chú
                        </th>
                    </tr>
                    <tr>
                      {maxColumnWidths.map((maxWidth, detailIndex) => (
                        <td
                          key={detailIndex}
                          style={{ width: `${maxWidth}ch` }}
                        >
                          {details[detailIndex]?.Rank != null
                            ? details[detailIndex].Rank
                            : details[detailIndex]?.ColumnContent || "0"}
                        </td>
                      ))}
                      {parsedJsonContent.Note != null ? (
                        <td
                          className="note-column"
                        >
                          {parsedJsonContent.Note}
                        </td>
                      ) : (
                        ""
                      )}
                    </tr>
                  </React.Fragment>
                );
              }
            })}
          </table>
        ) : (
          <div className="description-table">
            Hiện tại không có thông tin bảng điểm nào ?
          </div>
        )}
      </div>

      <Modal
        visible={modalVisible}
        title="Chi tiết bảng điểm"
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
      >
        <Box className="space-y-4 item-model-main" mb={2}>
          {selectedTranscript && selectedTranscript.details.length > 0 ? (
            <div>
              {selectedTranscript.isEarlierThanComparisonDate
                ? selectedTranscript.details.map((detail, index) => (
                    <div key={index} className="rollcall-check">
                      {detail.ColumName != "" ? <p>{detail.ColumName}</p> : ""}
                      <p className="text-color">
                        {detail.ColumnContent || "0"}
                      </p>
                    </div>
                  ))
                : selectedTranscript.details.map((detail, index) => (
                    <div key={index} className="rollcall-check">
                      {detail.ColumName != "" ? <p>{detail.ColumName}</p> : ""}
                      <p className="text-color">
                        {detail.Rank != null
                          ? detail.Rank
                          : detail.ColumnContent || "0"}
                      </p>
                    </div>
                  ))}
            </div>
          ) : (
            <p>Không có chi tiết để hiển thị.</p>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default TranscriptsTable;
