import { useCallback } from 'react';

const useCapitalize = () => {
  const capitalize = useCallback((str) => {
    return str
      .toLowerCase() // Chuyển toàn bộ chuỗi thành chữ thường
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Viết hoa ký tự đầu tiên của mỗi từ
  }, []);

  return { capitalize };
};

export default useCapitalize;
    