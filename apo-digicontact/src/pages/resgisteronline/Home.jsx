import React, { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import { Page, Box, Select, List, Icon, Modal } from "zmp-ui";
import { configAppView } from "zmp-sdk/apis";
const { Item } = List;
const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    configAppView({
      headerColor: "#8861bb",
      "statusBarColor": "#8861bb",
      headerTextColor: "white",
      hideAndroidBottomNavigationBar: true,
      hideIOSSafeAreaBottom: true,
      actionBar: {
        title: "Đăng ký học viên",
        leftButton: "back",
      },
      success: (res) => {
        console.log('Goi thanh cong');
      },
      fail: (error) => {
        console.log(error);
      },
    });
  }, []);
    const {  Option } = Select;
    
  const handleOnClickDeTailBranch = () =>{
    navigate('/detailbranch');
  }
  return (
    <Page className="section-container">
      <Box mt={6} className="select-register">
        <Select
          placeholder="Chọn khu vực"
        >
        
            <Option value="1" title="Hồ Chí Minh" />
            <Option value="2" title="Hà Nội" />

            <Option value="3" title="Đà Nẵng" />
            <Option value="4" title="Bà Rịa - Vũng Tàu" />
            <Option value="5" title="Bình Dương" disabled />
            <Option value="6" title="Đồng Nai" />
        </Select>
      </Box>
      <List>
        <Item
          title="Quận 1 - 31 Nguyễn Đình Chiểu"
          prefix={<Icon icon="zi-location" />}
          suffix={<Icon icon="zi-chevron-right"  />}
          onClick={handleOnClickDeTailBranch}
        /> 
      </List>
     
    </Page>
  );
};
export default Home;