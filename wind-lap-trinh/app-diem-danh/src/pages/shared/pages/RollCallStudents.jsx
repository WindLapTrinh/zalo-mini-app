import React from "react";
import { Box, Button } from "zmp-ui";
import "../styles/app.css";

const RollCallStudents = ({ onClickRollCall }) => {
  return (
    <Box className="box-review-all">
      <Button
        className="btn-review-all-data"
        onClick={onClickRollCall} 
        size="large"
      >
        Điểm danh
      </Button>
    </Box>
  );
};

export default RollCallStudents;
