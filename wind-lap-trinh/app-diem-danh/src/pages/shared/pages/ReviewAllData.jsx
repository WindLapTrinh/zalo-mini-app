import React from "react";
import { Box, Button } from "zmp-ui";
import "../styles/app.css";

const ReviewAllDate = ({ onClickDate }) => {
  return (
    <Box className="box-review-all">
      <Button
        className="btn-review-all-data"
        onClick={onClickDate} 
        size="large"
      >
        Điểm danh
      </Button>
    </Box>
  );
};

export default ReviewAllDate;
