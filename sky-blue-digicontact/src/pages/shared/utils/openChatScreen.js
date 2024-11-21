import {openChat} from "zmp-sdk/apis";

export const openChatScreen = async () => {
  try {
    await openChat({
      type: "oa",
      id: "1644530545549556966",
      message: "Xin Chào Học Viện Bóng Đá Quốc Tế Blue Sky VFF",
      success: async () => {
        try {
          const res = await axiosClient.post(
            "https://miniapp.ileader.vn/api/Test",
            {
              message: "Xin chào từ Zalo",
            },
            {
              timeout: 5000,
            }
          );
          console.log(res);
        } catch (error) {
          console.error("Error sending message to server:", error);
        }
      },
      fail: (err) => {
        console.error("Failed to open chat:", err);
      },
    });
  } catch (error) {
    console.error("Error opening chat:", error);
  }
};
