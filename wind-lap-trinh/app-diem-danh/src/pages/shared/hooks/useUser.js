import { useState, useCallback, useEffect } from 'react';
import { getUserInfo } from 'zmp-sdk/apis';

// Hook lấy thông tin người dùng
const useUser = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getUserInfo({});
      setUserInfo(response.userInfo);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Đưa ra một hàm refetch cho việc gọi lại API khi cần
  const refetch = () => {
    fetchUser();
  };

  return { userInfo, loading, error, refetch };
};

export default useUser;
