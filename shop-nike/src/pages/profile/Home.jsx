
import React from "react";
import { Box, Text } from "zmp-ui";
import Information from "./Infomation";
import CustomHeader from "../shared/pages/CustomHeader";
import CustomBottomNavigation from "../shared/components/CustomBottomNavigation";
import "../../css/profile/home.css";
const Home = () =>{
    return(
        <Box className="page-profile">
            <CustomHeader title={"Profile"}/>
            <Box className="box-profile">
                <Information/>
            </Box>
            <CustomBottomNavigation/>
        </Box>
    )
}
export default Home