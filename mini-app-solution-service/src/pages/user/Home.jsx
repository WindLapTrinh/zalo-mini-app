import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, List, Icon } from "zmp-ui";
import SetTitleHeader from "../shared/hooks/setTitleHeader";

const Home = () => {
    SetTitleHeader({
        title: "Nguyễn Thanh Phong"
    })
    return(
        <Box className="page-user">
            <Text>Page Use New</Text>
        </Box>
    );
}
export default Home;