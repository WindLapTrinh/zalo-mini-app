import React, { useState, useEffect } from "react";
import { Icon, Text, List, Avatar, Box } from "zmp-ui";
import Infomation from "../shared/pages/Infomation";
import Loading from "../shared/pages/Loading";
import { BsPatchCheckFill } from "react-icons/bs";
import axiosClient from "../shared/config/axios" 
import "../../css/student/listStudents.css";

const ListStudents = ({ phoneNumber, onSelectStudent }) => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (phoneNumber) {
      getStudentsByPhoneNumber(phoneNumber);
    }
  }, [phoneNumber]);

  const getStudentsByPhoneNumber = async (phoneNumber) => {
    try {
      const response = await axiosClient.get(
        `api/MiniApp/GetListStudents?phone=${phoneNumber}`,
        { responseType: "json" }
      );
      setStudents(response.data.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      {!isLoading && students.length > 0 && (
        <Box className="header-student">
          <BsPatchCheckFill className="icon-student-check" />
          <Text.Title className="title-header-student">
            ĐỒNG HÀNH CÙNG CON
          </Text.Title>
          <img
            src="./images/icon/icon-student-3.png"
            className="icon-header-student"
          />
        </Box>
      )}

      {isLoading && (
        <Loading/>
      )}

      {!isLoading && students.length === 0 && <Infomation />}

      {!isLoading && students.length > 0 && (
        <List>
          {students.map((student) => (
            <List.Item
              key={student.studentGuid}
              prefix={
                student.avatar ? (
                  <img
                    className="img-login"
                    src={"https://hoanganh2.ileader.vn" + student.avatar}
                    alt="slide-2"
                  />
                ) : (
                  <img
                    src="./images/icon/icon-user.png"
                    className="img-login"
                  />
                )
              }
              title={<p className="title-login">{student.student_FullName}</p>}
              subTitle={
                <p className="date-user">{student.student_DateOfBirth}</p>
              }
              suffix={
                <img
                  src="./images/icon/icon-student.png"
                  className="icon-student"
                />
              }
              onClick={() => onSelectStudent(student)}
              className="item-user"
            />
          ))}
        </List>
      )}
    </Box>
  );
};

export default ListStudents;
