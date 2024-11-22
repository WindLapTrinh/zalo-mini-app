import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, List, Icon } from "zmp-ui";
import CustomHeader from "../shared/pages/CustomHeader";
import axios from "axios";
import "../../css/class/home.css";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { guidTeacher } = location.state || {};
  console.log("Guid Teacher:", guidTeacher);

  const { Item } = List;
  const [classList, setClassList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hàm gọi API
  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://demo-x.ileader.vn/api/Class/GetListClassMiniApp?guidemployee=${guidTeacher}`
      );
      console.log("Data Res", response);
      if (response.data.success) {
        setClassList(response.data.data);
        console.log("Data:", response.data.data);
      } else {
        console.error("Error fetching classes:", response.data.message);
      }
    } catch (error) {
      console.error("Error calling API:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (guidTeacher) {
      fetchClasses();
    }
  }, [guidTeacher]);

  console.log("Class List:", classList);

  return (
    <Box className="page-class">
      <CustomHeader title={"Danh sách lớp"} />
      <Box className="box-class">
        {loading ? (
          <Box className="loading">Đang tải dữ liệu...</Box>
        ) : classList.length > 0 ? (
          <List>
            {classList.map((classItem) => (
              <Item
                key={classItem.guid}
                title={classItem.className}
                subtitle={`Chương trình: ${classItem.programmeName}`}
                after={<Icon type="chevron-right" />}
                onClick={() =>
                  navigate(`/class-detail`, { state: { classData: classItem } })
                }
              />
            ))}
          </List>
        ) : (
          <Box className="empty">Không có dữ liệu lớp học</Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
