import React from "react";
import { Box, Header, Text } from "zmp-ui";
import "../styles/app.css";
const CustomHeader = ({ title, subtitle, imageUrl, showBackIcon = false }) => {
  return (
    <Box>
      <Header
        className="app-header page-custom-header no-border pl-4 flex-none pb-[6px]"
        showBackIcon={showBackIcon}
        hideAndroidBottomNavigationBar={false}
        hideIOSSafeAreaBottom={false}
        title={
          <Box flex alignItems="center" className="space-x-2">
            {imageUrl && (
              <img
                className="w-8 h-8 rounded-lg border-inset"
                src={imageUrl}
                alt="Logo"
              />
            )}

            {title && (
              <Box>
                <Text.Title size="small">{title}</Text.Title>

                {subtitle && <Text size="xxSmall">{subtitle}</Text>}
              </Box>
            )}
          </Box>
        }
      />
    </Box>
  );
};

export default CustomHeader;
