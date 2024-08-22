import { useState, useEffect } from "react";
import { followOA } from "zmp-sdk/apis"; // Thay đổi đường dẫn theo cấu trúc dự án của bạn

const useFollowOA = (oaId) => {
  const [followSuccess, setFollowSuccess] = useState(false);

  // Kiểm tra trạng thái từ localStorage khi hook khởi tạo
  useEffect(() => {
    const storedStatus = localStorage.getItem("followSuccess");
    if (storedStatus !== null) {
      setFollowSuccess(JSON.parse(storedStatus));
    }
  }, []);

  const follow = async () => {
    try {
      await followOA({ id: oaId });
      setFollowSuccess(true);
      console.log("Successfully followed OA");

      // Lưu trạng thái followSuccess vào localStorage
      localStorage.setItem("followSuccess", JSON.stringify(true));
    } catch (error) {
      console.log("Failed to follow OA", error);
    }
  };

  return { followSuccess, follow };
};

export default useFollowOA;
