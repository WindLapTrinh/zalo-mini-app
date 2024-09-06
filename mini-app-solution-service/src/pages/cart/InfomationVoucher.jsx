import React, { useState } from "react";
import { List, Icon, Box, Text } from "zmp-ui";
import "../../css/cart/infomationVoucher.css";
import { BsFillTagsFill } from "react-icons/bs";
import VoucherSheet from "../vouchers/VoucherSheet"; // Nhập component mới

const InfomationVoucher = () => {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [voucherCode, setVoucherCode] = useState(""); // Để lưu mã voucher nhập vào

  const handleApplyVoucher = () => {
    setActionSheetVisible(true);
  };

  const handleApplyCode = () => {
    // Xử lý mã voucher ở đây
    console.log("Voucher Code Applied:", voucherCode);
    setActionSheetVisible(false);
  };

  return (
    <Box className="infomation-voucher">
      <Box className="header-infomation">
        <img
          className="icon-infomation"
          src="/images/icon/ticker.jpg"
          alt="Voucher Icon"
        />
        <Text className="section-title" size="large" bold mb={3}>
          Thông tin voucher
        </Text>
      </Box>
      <Box className="detail-infomation" mt={2}>
        <List>
          <List.Item className="item-infomation" onClick={handleApplyVoucher}>
            <div className="list-infomation">
              <BsFillTagsFill className="voucher-icon" />
              <div className="infomation-ticker">
                <div className="title-ticker">
                  Chưa áp dụng{" "}
                  <span className="descript-ticker">(chọn hoặc nhập mã)</span>
                </div>
                <div className="sum-voucher">
                  Có <span>1</span> voucher có thể áp dụng
                </div>
                <div className="note-voucher">Voucher của Wind</div>
              </div>
              <Icon icon="zi-chevron-right" className="list-item-chevron" />
            </div>
          </List.Item>
        </List>
      </Box>
      {/* Sử dụng component VoucherSheet */}
      <VoucherSheet
        visible={actionSheetVisible}
        onClose={() => setActionSheetVisible(false)}
        onApplyCode={handleApplyCode}
        voucherCode={voucherCode}
        setVoucherCode={setVoucherCode}
      />
    </Box>
  );
};

export default InfomationVoucher;
