import { useCallback } from "react";
import { format } from "date-fns";

// Custom hook to format a date into "dd/MM/yyyy"
const useFormatDate = (defaultFormat = "dd/MM/yyyy") => {
  const formatDate = useCallback((dateString, customFormat) => {
    if (!dateString) return "";
    const parsedDate = new Date(dateString);
    return format(parsedDate, customFormat || defaultFormat);
  }, [defaultFormat]);

  return formatDate;
};

export default useFormatDate;
