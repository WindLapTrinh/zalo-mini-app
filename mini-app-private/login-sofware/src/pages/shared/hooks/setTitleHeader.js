import { useEffect } from 'react';
import { configAppView } from "zmp-sdk/apis";

const SetTitleHeader = ({ title, headerColor, statusBarColor, headerTextColor }) => {
  useEffect(() => {
    configAppView({
      headerColor: headerColor || "#00346b",
      statusBarColor: statusBarColor || "#00346b",
      headerTextColor: headerTextColor || "white",
      hideAndroidBottomNavigationBar: true,
      hideIOSSafeAreaBottom: true,
      actionBar: {
        title: title || "Wind Lập Trình",
        leftButton: "back",
      },
      success: (res) => {
        console.log("Gọi thành công");
      },
      fail: (error) => {
        console.log(error);
      },
    });
  }, [title, headerColor, statusBarColor, headerTextColor]);
};

export default SetTitleHeader;
