// src/shared/components/DateSelect.js
import React from 'react';
import { Box, Select, Text } from 'zmp-ui';
import { genTestData, getYear } from '../shared/utils/dateUtils'; // Create this utility file for genTestData and getYear
import "../../css/accountant/tuitionfees.css"

const DateSelect = ({ currentMonth, currentYear, setSelectedMonth, setSelectedYear }) => {
  const handleMonthChange = (value) => {
    setSelectedMonth(value);
  };

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  return (
    <div className="form-date">
      <div className="date-left">
        <Box>
          <Select
            label="Chọn tháng"
            placeholder="chọn tháng..."
            defaultValue={currentMonth}
            onChange={handleMonthChange}
            closeOnSelect={true}
          >
            {genTestData("key1", 12, "Tháng", currentMonth).map((option) => (
              <Option key={option.value} value={option.value} title={option.displayName}>
                {option.displayName}
              </Option>
            ))}
          </Select>
        </Box>
      </div>
      <div className="date-right">
        <Box>
          <Select
            label="Chọn năm"
            placeholder="chọn năm..."
            defaultValue={currentYear}
            onChange={handleYearChange}
            closeOnSelect={true}
          >
            {getYear("key2020", 2050, "Năm", currentYear).map((option) => (
              <Option key={option.value} value={option.value} title={option.displayName}>
                {option.displayName}
              </Option>
            ))}
          </Select>
        </Box>
      </div>
    </div>
  );
};

export default DateSelect;
