import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, List, Icon } from "zmp-ui";
import SetTitleHeader from "@/pages/shared/hooks/setTitleHeader";
import CustomBottomNavigation from "../shared/components/CustomBottomNavigation";
import { openChatScreen } from '../../pages/shared/utils/openChatScreen';
import useFollowOA from '../../pages/shared/hooks/useFollowOA';

import "../../css/user/userPage.css";

const UserPage = () => {
  SetTitleHeader({
    title: "Cá nhân"
  });

  const navigate = useNavigate();
  const oaId = "9905154963002439"; 
  const { followSuccess, follow } = useFollowOA(oaId);

  const handleHistoryCart = () => {
    navigate("/purchaseHistory");
  };

  const handleFollowOA = async () => {
    await follow(); 
  };

  return (
    <Box className="user-page" p={4}>
      <Box className="form-section" mt={2} mb={2} onClick={handleFollowOA}>
        <Text className="form-title" size="medium" bold mb={2}>
        {followSuccess ? "Bạn đã là thành viên Wind" : "Trở thành thành viên Wind E-commerce"}
        </Text>
        <Text size="small" className="descript-user">
          {followSuccess 
            ? "Là thành viên và sẽ nhận được nhiều ưu đãi!" 
            : "Hãy mua hàng để nhận nhiều ưu đãi nhé!"}
        </Text>
      </Box>
      <Box className="history-cart">
        <Text className="title-history" size="medium" bold mb={2}>
          Cá nhân
        </Text>
        <List>
          <List.Item
            title="Lịch sử đặt hàng"
            className="list-history"
            prefix={<Icon icon="zi-clock-1" />}
            suffix={<Icon icon="zi-chevron-right" />}
            onClick={handleHistoryCart}
          />
        </List>
      </Box>
      <Box className="history-cart">
        <Text className="title-history" size="medium" bold mb={2}>
          Khác
        </Text>
        <List>
          <List.Item
            title="Liên hệ và hỗ trợ qua Zalo OA"
            className="list-history"
            prefix={<Icon icon="zi-chat" />}
            suffix={<Icon icon="zi-chevron-right" />}
            onClick={openChatScreen}
          />
        </List>
      </Box>
      <CustomBottomNavigation />
    </Box>
  );
};

export default UserPage;
