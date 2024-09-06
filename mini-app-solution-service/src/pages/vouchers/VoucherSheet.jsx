import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import { Box, Text, Button, Input, Radio, Sheet } from "zmp-ui";
import "../../css/cart/infomationVoucher.css";


const VoucherSheet = ({ visible, onClose, onApplyCode, voucherCode, setVoucherCode }) => {
  const navigate = useNavigate();
  const handleApplyVoucher = () => {
    navigate("/update")
  }
  return (
    <Sheet
      visible={visible}
      onClose={onClose}
      autoHeight
      mask
      handler
      swipeToClose
    >
      <Box p={4} className="custom-bottom-sheet" flex flexDirection="column">
        <Box className="sheet-header">
          <img className="img-sheet-header" alt="logo" src="/images/icon/voucher-giftbox.jpg" />
          <Box className="description-shet-header">
            <Text className="bottom-sheet-title" size="large" bold>Tomo Makert</Text>
            <Text className="bottom-sheet-description" size="large" bold>(Ưu đãi khách hàng)</Text>
          </Box>
        </Box>
        <Box className="bottom-sheet-body" mt={3}>
          <Input
            className="input-sheet-body"
            type="text"
            placeholder="Nhập mã ưu đãi"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
          />
          <Button onClick={onApplyCode} className="btn-apply-voucher">
            Áp dụng
          </Button>
        </Box>
        <Box className="list-voucher-sheet">
          <Text className="title-sheet-body" size="large" bold>Voucher từ Tomo Makert</Text>
          <Box className="item-voucher-sheet">
            <img className="img-item-voucher" alt="" src="/images/icon/free-ship.jpg" />
            <Box className="detail-item-voucher">
              <div className="title-item-voucher">Free ship giảm 30k</div>
              <div className="description-item-voucher">
                <p>Đơn tối thiểu 50k</p>
                <span>HSD: <span className="date-item-voucher">29/07/2024</span></span>
              </div>
            </Box>
            <Radio className="check-item-voucher" value={1} size="small" name="small-1" />
          </Box>
        </Box>
        <Box className="apply-voucher">
          <Button className="btn-submit-voucher" fullWidth onClick={handleApplyVoucher}>Áp dụng</Button>
        </Box>
      </Box>
    </Sheet>
  );
};

export default VoucherSheet;
