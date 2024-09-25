import React from "react";
import { Box, Text, Icon } from "zmp-ui";

const Events = () => {
    return(
        <Box className="box-event">
            <Box className="item-box-event">
                <Box className="left-item-event">
                    <Text className="title-item-event">Inbox</Text>
                    <Text className="description-item-event">View Messages</Text>
                </Box>
                <Box className="right-item-event">
                    <Icon icon= "zi-chevron-right"/>
                </Box>
            </Box>
            <Box className="item-box-event">
                <Box className="left-item-event">
                    <Text className="title-item-event">You Nike Member Rewards</Text>
                    <Text className="description-item-event">2 available</Text>
                </Box>
                <Box className="right-item-event">
                    <Icon icon= "zi-chevron-right"/>
                </Box>
            </Box>
        </Box>
    )
}
export default Events;