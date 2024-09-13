import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, List, Icon } from "zmp-ui";
import SetTitleHeader from "../shared/hooks/setTitleHeader";
import CustomHeader from "../shared/pages/CustomHeader";

const Home = () => {
    return(
        <Box>
        <CustomHeader title={"Cá nhân"}/>
        <Box className="page-user">
            <Text>Page Use New</Text>
        </Box>
        </Box>
    );
}
export default Home;