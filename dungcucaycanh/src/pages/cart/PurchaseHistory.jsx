import React, { useState } from "react";
import { Box, Tabs } from "zmp-ui";
import CustomBottomNavigation from "../shared/components/CustomBottomNavigation";
import SetTitleHeader from "@/pages/shared/hooks/setTitleHeader";
import UpdateCart from "@/pages/shared/pages/UpdateCart.jsx";
import "../../css/cart/prurchaseHistory.css";

const PurchaseHistory = () => {
  SetTitleHeader({
    title: "Lịch sử đặt hàng"
  })
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <Box className="purchase-history">
      <Box className="history-container">
        <Box className="slider-history bg-white p-4">
          <div className="tabs-wrapper">
            <Tabs className="horizontal-tabs" id="purchase-history-tabs" scrollable="true">
              <Tabs.Tab key="tab1" label="Tất cả">
                <UpdateCart/>
              </Tabs.Tab>
              <Tabs.Tab key="tab2" label="Đang xử lý">
              </Tabs.Tab>
              <Tabs.Tab key="tab3" label="Đang giao">
              </Tabs.Tab>
              <Tabs.Tab key="tab4" label="Đã hoàn thành">
              </Tabs.Tab>
              <Tabs.Tab key="tab5" label="Đã hủy">
              </Tabs.Tab>
              <Tabs.Tab key="tab6" label="Hoàn trả">
              </Tabs.Tab>
            </Tabs>
          </div>
        </Box>
        <CustomBottomNavigation/>
      </Box>
    </Box>
  );
};

export default PurchaseHistory;
