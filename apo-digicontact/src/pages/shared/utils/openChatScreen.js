import {openChat} from "zmp-sdk/apis";

export const openChatScreen = async () => {
  try {
    await openChat({
      type: "oa",
      id: "3987067628073786435",
      message: "Xin Chào Trung Tâm Ngoại Ngữ Hoàng Anh",
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
