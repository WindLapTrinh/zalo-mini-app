import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosClient from "../shared/config/axios";
import { Box, List, Input, Checkbox, Button, Text } from "zmp-ui";
import CustomHeader from "../shared/pages/CustomHeader";
import RollCallStudents from "../shared/pages/RollCallStudents";
import "../../css/student/home.css";

const { Item } = List;

const StudentsHome = () => {
  const location = useLocation();
  const [students, setStudents] = useState([]);
  const [rollcall, setRollcall] = useState(0);
  const [searchTerm, setSearchTerm] = useState(''); // State quản lý tìm kiếm
  const [checkAll, setCheckAll] = useState(false); // State quản lý chọn tất cả

  const guid = location.state?.guid;
  const className = location.state?.className;

  useEffect(() => {
    const fetchStudents = async () => {
      if (!guid) {
        console.error("GUID không được cung cấp.");
        return;
      }
      try {
        const response = await axiosClient.get(
          `api/Class/GetListStudentAttendanceMiniApp?strClassGuid=${guid}`,
          { responseType: "json" }
        );
        const studentsData = JSON.parse(response.data.data);
        const formattedStudents = studentsData.map((student) => ({
          id: student.StudentGuid,
          name: student.StudentName,
          phone: student.StudentPhone,
          checked: false,
        }));
        setStudents(formattedStudents);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách học sinh:", error.message);
      }
    };

    fetchStudents();
  }, [guid]);

  const onSelectStudent = (studentId) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student.id === studentId) {
          const updatedChecked = !student.checked;
          setRollcall((prevRollcall) =>
            updatedChecked ? prevRollcall + 1 : prevRollcall - 1
          );
          return { ...student, checked: updatedChecked };
        }
        return student;
      })
    );
  };

  const handleCheckAll = () => {
    const newCheckAllStatus = !checkAll;
    setCheckAll(newCheckAllStatus);
    setStudents((prevStudents) =>
      prevStudents.map((student) => ({
        ...student,
        checked: newCheckAllStatus,
      }))
    );
    setRollcall(newCheckAllStatus ? students.length : 0); // Update rollcall count based on selection
  };

  const handleSendToServer = async () => {
    const selectedStudents = students
      .filter((student) => student.checked)
      .map((student) => student.id);
    console.log("List Guid RollCall By Students:", selectedStudents);
    if (selectedStudents.length === 0) {
      alert("Vui lòng chọn ít nhất một học sinh!");
      return;
    }

    try {
      const response = await axiosClient.post(
        "https://your-api-endpoint.com/api/SubmitSelectedStudents",
        { studentGuids: selectedStudents }
      );

      alert("Gửi dữ liệu thành công!");
      console.log("Phản hồi từ server:", response.data);
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error.message);
      alert("Có lỗi xảy ra khi gửi dữ liệu!");
    }
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value); // Cập nhật giá trị tìm kiếm
  };

  // Lọc danh sách học sinh
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box className="page-student">
      <CustomHeader title={`${className}`} showBackIcon={true} />
      <Box className="box-student">
        <Box className="box-search">
          <Input.Search
            placeholder="Tìm kiếm học sinh..."
            size="small"
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <Box className="sum-student">
            <Box className="student-rollcall">{rollcall}</Box>
            <Box className="student-inclass">{students.length}</Box>
          </Box>
          
        </Box>
        <Box className="box-check-all"  onClick={handleCheckAll}>
        <Text className="check-all">{checkAll ? "Bỏ chọn" : "Tất cả"}</Text>
        </Box>
        <Box className="box-list-student">
          <List>
            {filteredStudents.map((student) => (
              <Item
                key={student.id}
                prefix={
                  <img
                    className="image-student"
                    src="./images/icon/icon-user-3.png"
                    alt="student"
                  />
                }
                title={<p className="title-login">{student.name}</p>}
                subTitle={<p className="date-user">{student.phone}</p>}
                suffix={
                  <Checkbox
                    checked={student.checked}
                    onChange={() => onSelectStudent(student.id)}
                  />
                }
                className="item-student"
              />
            ))}
          </List>
        </Box>
        <RollCallStudents onClickRollCall={handleSendToServer} />
      </Box>
    </Box>
  );
};

export default StudentsHome;
