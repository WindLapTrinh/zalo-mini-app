
import { useState, useEffect } from 'react';

const CurrentDate = (initialDate) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());

  useEffect(() => {
    const now = new Date();
    setCurrentMonth(now.getMonth() + 1);
    setCurrentYear(now.getFullYear());
  }, []);

  return { currentDate, currentMonth, currentYear, setCurrentDate };
};

export default CurrentDate;
