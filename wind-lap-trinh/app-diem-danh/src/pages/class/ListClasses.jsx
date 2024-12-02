import React, { useState, useEffect } from "react";
import { Icon, Text, List, Avatar, Box } from "zmp-ui";
import Infomation from "../shared/pages/Infomation";
import Loading from "../shared/pages/Loading";
import { BsPatchCheckFill } from "react-icons/bs";
import axiosClient from "../shared/config/axios";
import "../../css/class/listClasses.css";

const ListClasses = ({ phoneNumber, onSelectItemClass }) => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (phoneNumber) {
      getClassesByPhoneNumber(phoneNumber);
    }
  }, [phoneNumber]);

  // Hàm lấy danh sách lớp học
  const getClassesByPhoneNumber = async (phoneNumber) => {
    try {
      const response = await axiosClient.get(
        `api/Class/GetListClassMiniApp?phone=${phoneNumber}`,
        { responseType: "json" }
      );

      // Xử lý JSON trả về
      const rawData = JSON.parse(response.data.data);
      const extractedClasses = rawData.flatMap((item) => item.value); // Lấy danh sách lớp từ "value"
      setClasses(extractedClasses);
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      {!isLoading && classes.length > 0 && (
        <Box className="header-student">
          <BsPatchCheckFill className="icon-student-check" />
          <Text.Title className="title-header-student">
            CHƯƠNG TRÌNH GIẢNG DẠY
          </Text.Title>
          <img
            src="./images/icon/icon-student-3.png"
            className="icon-header-student"
            alt="header-icon"
          />
        </Box>
      )}

      {/* Hiển thị trạng thái Loading */}
      {isLoading && <Loading />}

      {/* Hiển thị thông tin nếu không có lớp */}
      {!isLoading && classes.length === 0 && <Infomation />}

      {/* Hiển thị danh sách lớp */}
      {!isLoading && classes.length > 0 && (
        <List>
          {classes.map((item) => (
            <List.Item
              key={item.Guid}
              prefix={
                <Avatar
                  src="./images/icon/icon-list-notify.png"
                  alt={item.ClassnName}
                  className="img-class"
                />
              }
              title={<p className="title-login">{item.ClassnName}</p>}
              onClick={() => onSelectItemClass(item)}
              className="item-user"
            />
          ))}
        </List>
      )}
    </>
  );
};

export default ListClasses;
