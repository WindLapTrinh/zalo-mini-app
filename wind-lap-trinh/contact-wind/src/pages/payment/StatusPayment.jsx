import React, { useState } from "react";

import { Box, Text, Modal } from "zmp-ui";
import "../../css/payment/statusPayment.css";

const StatusPayment = () => {
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleSheetStatus = () => {
    setDialogVisible(true);
  }
  return (
    <Box className="page-status">
        <Box className="status-payment" onClick={handleSheetStatus}>
           Hủy đơn hàng
        </Box>
        <Modal
        visible={dialogVisible}
        title="Xác nhận hủy đơn hàng"
        onClose={() => {
          setDialogVisible(false);
        }}
        actions={[
          {
            text: "Đồng ý",
          },
          {
            text: "Hủy",
            close: true,
            danger: true,
          },
        ]}
        description="Bạn chắc chắn muốn hủy đơn hàng? Hãy cân nhắc thêm giúp Shop nha!"
      />
    </Box>
  );
};

export default StatusPayment;
