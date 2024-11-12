import React from "react";
import { Box, Button } from "zmp-ui";
import "../styles/app.css";

const ReviewAllDate = ({ onClickDate }) => {
  return (
    <Box mt={5} mb={5} className="box-review-all">
      <Button
        className="btn-review-all-data"
        onClick={onClickDate} // Sử dụng props để gọi hàm từ parent
        size="large"
      >
        Xem tất cả
      </Button>
    </Box>
  );
};

export default ReviewAllDate;
