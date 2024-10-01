import { showToast } from "zmp-sdk/apis";
import { useCallback } from "react";

const useToast = () => {
  const openToast = useCallback(async (message) => {
    try {
      await showToast({
        message: message, 
      });
    } catch (error) {
      console.log("Toast error:", error); 
    }
  }, []);

  return openToast;
};

export default useToast;
