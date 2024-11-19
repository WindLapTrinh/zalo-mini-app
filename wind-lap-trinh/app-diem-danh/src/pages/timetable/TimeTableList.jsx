import React, { useEffect, useState } from "react";
import { Box, Modal } from "zmp-ui";
import HeaderFormDate from "./HeaderFormDate";
import { GoDotFill } from "react-icons/go";
import axios from "axios";
import axiosClient from "../shared/config/axios";
import "../../css/timetable/home.css";

const TimeTableList = ({ timeTables }) => {
  const [columnWidths, setColumnWidths] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTimeTable, setSelectedTimeTable] = useState(null);

  const daysOfWeek = [
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
    "Chủ Nhật",
  ];

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const parsedDate = new Date(dateString);
    return `${parsedDate.getDate()}/${
      parsedDate.getMonth() + 1
    }/${parsedDate.getFullYear()}`;
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";
    const parsedDate = new Date(dateString);
    const hours = parsedDate.getHours();
    const minutes = parsedDate.getMinutes();
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const calculateMaxWidths = () => {
      const maxWidths = {};

      timeTables.forEach((timeTable) => {
        const parsedJsonContent = JSON.parse(timeTable.jsonContent || "{}");
        const sessions = parsedJsonContent.JsContent || [];

        sessions.forEach((item) => {
          const [dayOfWeek, details] = item.split(": ");
          if (details && details.trim() !== "Ngày nghỉ") {
            try {
              const session = JSON.parse(details);
              session.forEach((sessionDetail) => {
                const combinedLength =
                  sessionDetail.SectionName.length +
                  sessionDetail.TeacherName.join(", ").length +
                  sessionDetail.RoomName.length +
                  `${formatTime(sessionDetail.StartTime)} - ${formatTime(
                    sessionDetail.EndTime
                  )}`.length;

                const normalizedDay = dayOfWeek.trim().toLowerCase();
                maxWidths[normalizedDay] = Math.max(
                  maxWidths[normalizedDay] || 0,
                  combinedLength
                );
              });
            } catch (error) {
              console.error("Error parsing session details:", error);
            }
          }
        });
      });

      setColumnWidths(maxWidths);
    };

    calculateMaxWidths();
  }, [timeTables]);

  const sendCheckedStateToServer = async (timeTable) => {
    try {
      await axiosClient.post(
        `api/MiniApp/CheckSeen?guid=${timeTable.guid}&check=true`
      );
      console.log("Đã gửi trạng thái seen lên server thành công");
    } catch (error) {
      console.error("Lỗi khi gửi trạng thái seen lên server:", error);
    }
  };

  // Xử lý khi nhấn vào một phần tử trong bảng
  const handleItemTimeTable = (timeTable) => {
    if (timeTable.seen === false) {
      sendCheckedStateToServer(timeTable);
      timeTable.seen = true;
    }

    const parsedJsonContent = timeTable.jsonContent
      ? JSON.parse(timeTable.jsonContent)
      : {};
    const details = parsedJsonContent.JsContent || [];

    // Loại bỏ các chi tiết không hợp lệ trước khi cập nhật selectedTimeTable
    const validDetails = details.filter((detail) => {
      // Nếu chi tiết là "Ngày nghỉ", không thêm vào validDetails
      return detail && detail.trim() !== "Ngày nghỉ";
    });

    setSelectedTimeTable(validDetails);
    setModalVisible(true);
  };

  if (timeTables.length === 0) {
    return (
      <div className="description-table">
        Hiện tại không có thời khóa biểu nào ?
      </div>
    );
  }

  return (
    <Box>
      <div className="timetable-container">
        {timeTables.length > 0 ? (
          <table className="timetable-table">
            <tbody>
              {timeTables.map((timeTable, index) => {
                const parsedJsonContent = JSON.parse(
                  timeTable.jsonContent || "{}"
                );
                const dateApplied = formatDate(
                  parsedJsonContent.DateApplication
                );

                const schedule = {
                  "thứ hai": [],
                  "thứ ba": [],
                  "thứ tư": [],
                  "thứ năm": [],
                  "thứ sáu": [],
                  "thứ bảy": [],
                  "chủ nhật": [],
                };

                parsedJsonContent.JsContent?.forEach((item) => {
                  const [dayOfWeek, details] = item.split(": ");
                  const normalizedDayOfWeek = dayOfWeek.trim().toLowerCase();

                  if (details && details.trim() !== "Ngày nghỉ") {
                    try {
                      const sessions = JSON.parse(details);
                      if (schedule.hasOwnProperty(normalizedDayOfWeek)) {
                        schedule[normalizedDayOfWeek] = sessions;
                      }
                    } catch (error) {
                      console.error("Error parsing session details:", error);
                    }
                  } else {
                    // Xử lý trường hợp "Ngày nghỉ"
                    if (schedule.hasOwnProperty(normalizedDayOfWeek)) {
                      schedule[normalizedDayOfWeek] = "Ngày nghỉ";
                    }
                  }
                });
                parsedJsonContent.JsContent?.forEach((item) => {
                  const [dayOfWeek, details] = item.split(": ");
                  const normalizedDayOfWeek = dayOfWeek.trim().toLowerCase();

                  // Nếu details không tồn tại hoặc là "Ngày nghỉ"
                  if (!details || details.trim() === "Ngày nghỉ") {
                    if (schedule.hasOwnProperty(normalizedDayOfWeek)) {
                      schedule[normalizedDayOfWeek] = "Ngày nghỉ";
                    }
                  } else {
                    try {
                      // Nếu có details, cố gắng phân tích cú pháp
                      const sessions = JSON.parse(details);
                      if (schedule.hasOwnProperty(normalizedDayOfWeek)) {
                        schedule[normalizedDayOfWeek] = sessions;
                      }
                    } catch (error) {
                      console.error("Error parsing session details:", error);
                      // Xử lý nếu không thể phân tích cú pháp
                      if (schedule.hasOwnProperty(normalizedDayOfWeek)) {
                        schedule[normalizedDayOfWeek] = "Chi tiết không hợp lệ"; // Hoặc giá trị thay thế khác
                      }
                    }
                  }
                });

                const hasSchedule = Object.values(schedule).some(
                  (daySessions) =>
                    Array.isArray(daySessions)
                      ? daySessions.length > 0
                      : daySessions === "Ngày nghỉ"
                );

                return (
                  <React.Fragment key={index}>
                    <tr onClick={() => handleItemTimeTable(timeTable)}>
                      <th
                        colSpan={daysOfWeek.length + 1}
                        className="timetable-header"
                      >
                        {timeTable.seen === false ? (
                          <div className="notify-check">
                            <GoDotFill className="text-red" />
                            <span>Ngày áp dụng: {dateApplied}</span>
                          </div>
                        ) : (
                          <span>Ngày áp dụng: {dateApplied}</span>
                        )}
                      </th>
                    </tr>
                    <tr>
                      <th>Môn học</th>
                      {daysOfWeek.map((day) => (
                        <th key={day}>{day}</th>
                      ))}
                    </tr>
                    <tr className="item-day-week">
                      <td>{parsedJsonContent.ScheduleName}</td>
                      {daysOfWeek.map((day) => {
                        const normalizedDay = day.toLowerCase().trim();
                        return (
                          <td
                            key={day}
                            style={{
                              width: `${columnWidths[normalizedDay] || 10}ch`, // Default width if not calculated
                            }}
                            className="item-data-week"
                          >
                            {Array.isArray(schedule[normalizedDay]) &&
                            schedule[normalizedDay].length > 0 ? (
                              schedule[normalizedDay].map((session, idx) => (
                                <table key={idx} className="nested-table">
                                  <thead>
                                    <tr>
                                      <th>Tiết</th>
                                      <th>Thời gian</th>
                                      <th>Giáo viên</th>
                                      <th>Phòng</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>{session.SectionName}</td>
                                      <td>
                                        {formatTime(session.StartTime)} -{" "}
                                        {formatTime(session.EndTime)}
                                      </td>
                                      <td>{session.TeacherName.join(", ")}</td>
                                      <td>{session.RoomName}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              ))
                            ) : (
                              <div className="item-dropout">
                                {schedule[normalizedDay] === "Ngày nghỉ"
                                  ? "Ngày nghỉ"
                                  : "Không có lịch học"}
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                    {!hasSchedule && (
                      <tr>
                        <td colSpan={daysOfWeek.length + 1}>
                          Không có lịch học
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="description-table">
            Hiện tại không có thời khóa biểu nào?
          </div>
        )}
      </div>
      <Modal
        visible={modalVisible}
        title="Chi tiết thời khóa biểu"
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
        <Box className="space-y-4">
          {selectedTimeTable && selectedTimeTable.length > 0 ? (
            <div>
              {selectedTimeTable.map((schedule, index) => (
                <div key={index}>
                  <p className="title-modal-timetable">{schedule.split(": ")[0]}</p>
                  <div>
                    {(() => {
                      try {
                        const sessions = JSON.parse(schedule.split(": ")[1]);
                        return sessions.map((session, idx) => (
                          <div key={idx} className="session-details">
                            <p className="rollcall-check">
                              <p className="text-modal">Tiết</p>
                              <p>{session.SectionName}</p>
                            </p>
                            <p className="rollcall-check">
                              <p className="text-modal">Thời gian</p>{" "}
                              <p>
                                {formatTime(session.StartTime)} -{" "}
                                {formatTime(session.EndTime)}
                              </p>
                            </p>
                            <p className="rollcall-check">
                              <p className="text-modal">Giáo viên</p>{" "}
                              <p> {session.TeacherName.join(", ")}</p>
                            </p>
                            <p className="rollcall-check">
                              <p className="text-modal">Phòng</p> 
                              <p>{session.RoomName}</p>
                            </p>
                          </div>
                        ));
                      } catch (e) {
                        console.error("Error parsing session details:", e);
                        return <div className="item-dropout">Ngày nghỉ</div>;
                      }
                    })()}
                  </div>
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

export default TimeTableList;
