import { useEffect } from 'react';
import { configAppView } from "zmp-sdk/apis";

const SetTitleHeader = ({ title, headerColor, statusBarColor, headerTextColor }) => {
  useEffect(() => {
    configAppView({
      headerColor: headerColor || "#1e2121",
      statusBarColor: statusBarColor || "#1e2121",
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
