import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Text, Button, Header } from "zmp-ui";
import CustomBottomNavigation from "../shared/components/CustomBottomNavigation";
import CustomHeader from "../shared/pages/CustomHeader";
import "../../css/notify/notifyPage.css";

const notifications = [
  {
    id: 1,
    title: "Đơn hàng iPhone 15 Pro Max 256 GB",
    message: "Sẽ được giao trong 2 ngày tới, người đang chuẩn bị lấy hàng",
    date: "2024-07-20",
  },
  // Thêm các thông báo khác nếu cần
];

const NotificationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { keyTab } = location.state || { keyTab };
  const handleHistoryCart = () => {
    navigate("/purchaseHistory");
  };

  return (
    <Box>
      <Header title="Thông báo"  showBackIcon={false}/>
      <Box className="notification-page">
        <Box className="box-custom-header"></Box>
        <Box className="notification-list">
          {notifications.map((notification) => (
            <Box
              key={notification.id}
              className="notification-item"
              p={2}
              mb={2}
              border
              onClick={handleHistoryCart}
            >
              <Text className="notification-title" size="medium" bold>
                {notification.title}
              </Text>
              <Text className="notification-message" size="small">
                {notification.message}
              </Text>
              <Text className="notification-date" size="xSmall" color="gray">
                {notification.date}
              </Text>
              {/* <Button className="view-details-button" mt={2}>
              View Detail
            </Button> */}
            </Box>
          ))}
        </Box>
        <CustomBottomNavigation />
      </Box>
    </Box>
  );
};

export default NotificationPage;
