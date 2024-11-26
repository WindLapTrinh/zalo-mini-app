import React, { useState } from "react";
import { Box, List, Input, Checkbox, Button, Text } from "zmp-ui";
import CustomHeader from "../shared/pages/CustomHeader";
import ReviewAllData from "../shared/pages/ReviewAllData";
import "../../css/student/home.css";

const { Item } = List;

const Home = () => {
  // Dữ liệu mẫu
  const [students, setStudents] = useState([
    { id: 1, name: "Lê Văn Hải", age: 2, checked: false },
    { id: 2, name: "Nguyễn Thị Lan", age: 3, checked: false },
    { id: 3, name: "Trần Đức Minh", age: 4, checked: false },
    { id: 4, name: "Phạm Thị Hạnh", age: 2, checked: false },
    { id: 5, name: "Nguyễn Văn Nam", age: 5, checked: false },
    { id: 6, name: "Hoàng Thị Mai", age: 4, checked: false },
    { id: 7, name: "Vũ Văn Khánh", age: 3, checked: false },
    { id: 8, name: "Đinh Thị Hoa", age: 2, checked: false },
    { id: 9, name: "Trần Quang Huy", age: 3, checked: false },
    { id: 10, name: "Ngô Thị Ngọc", age: 4, checked: false },
    { id: 11, name: "Lê Thị Hương", age: 2, checked: false },
    { id: 12, name: "Bùi Văn Phúc", age: 5, checked: false },
    { id: 13, name: "Trần Thị Thanh", age: 4, checked: false },
    { id: 14, name: "Nguyễn Văn Tú", age: 3, checked: false },
    { id: 15, name: "Phan Thị Nga", age: 2, checked: false },
    { id: 16, name: "Hoàng Văn Tiến", age: 5, checked: false },
  ]);

  const [rollcall, setRollcall] = useState(0);
  const inClass = students.length;

  // Xử lý khi chọn/bỏ chọn sinh viên
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

  // Xử lý Check All
  const toggleCheckAll = (checkAll) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => ({ ...student, checked: checkAll }))
    );
    setRollcall(checkAll ? inClass : 0);
  };

  return (
    <Box className="page-student">
      <CustomHeader title={"Danh sách vào lớp"} showBackIcon={"true"} />
      <Box className="box-student">
        {/* Tìm kiếm */}
        <Box className="box-search">
          <Input.Search
            placeholder="Tìm kiếm học sinh..."
            size="small"
            onSearch={(value) => {
              console.log(value);
            }}
          />
          <Box className="sum-student">
            <Box className="student-rollcall">{rollcall}</Box>
            <Box className="student-inclass">{inClass}</Box>
          </Box>
        </Box>

        <Box className="box-check-all" onClick={() => toggleCheckAll(true)}>
          <Text className="check-all">Check All</Text>
        </Box>

        {/* Danh sách học sinh */}
        <Box className="box-list-student">
          <List>
            {students.map((student) => (
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
                subTitle={<p className="date-user">{student.age} tuổi</p>}
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
      </Box>
      <ReviewAllData />
    </Box>
  );
};

export default Home;
