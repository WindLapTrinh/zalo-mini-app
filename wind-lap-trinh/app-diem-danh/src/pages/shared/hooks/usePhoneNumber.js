import { useState, useCallback } from 'react';
import { getAccessToken, getPhoneNumber } from 'zmp-sdk/apis';
import axios from 'axios';

// Hook lấy số điện thoại
const usePhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPhoneNumber = useCallback(async () => {
    setLoading(true);
    try {
      const accessToken = await getAccessToken();
      const { token: phoneNumberToken } = await getPhoneNumber();
      const endpoint = 'https://graph.zalo.me/v2.0/me/info';
      const secretKey = 'SC7C3EQocWcEMVUXrP2d';
 
      if (accessToken && phoneNumberToken) {
        const response = await axios.get(endpoint, {
          headers: {
            access_token: accessToken,
            code: phoneNumberToken,
            secret_key: secretKey,
          },
        });

        if (response.data.data.number) {
          setPhoneNumber(response.data.data.number);
        }
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { phoneNumber, loading, error, fetchPhoneNumber };
};

export default usePhoneNumber;
