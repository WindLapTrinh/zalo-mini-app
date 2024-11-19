
import { setNavigationBarTitle, getUserInfo, interactOA, openChat, followOA } from "zmp-sdk/apis";

const ZMPConfig = () => {
  setNavigationBarTitle({ title: "My App" });
};

const fetchUserInfo = async () => {
  try {
    const userInfo = await getUserInfo();
    console.log(userInfo);
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
};

export { ZMPConfig, fetchUserInfo, interactOA, openChat, followOA };
