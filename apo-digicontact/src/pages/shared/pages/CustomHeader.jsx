import React from "react";
import { Box, Header, Text } from "zmp-ui";
import "../styles/app.css";

const CustomHeader = ({
  title,
  subtitle,
  levelAccount,
  imageUrl,
  imageAccount,
  showBackIcon = false,
  onBackClick, // Add custom back click handler
}) => {
  return (
    <Box>
      <Header
        className={
          imageAccount
            ? "app-header custom-header-account page-custom-header no-border pl-4 flex-none pb-[6px]"
            : "app-header page-custom-header no-border pl-4 flex-none pb-[6px]"
        }
        showBackIcon={showBackIcon}
        hideAndroidBottomNavigationBar={false}
        hideIOSSafeAreaBottom={false}
        title={
          <Box flex alignItems="center" className="space-x-2">
            {imageUrl && (
              <img
                className="w-8 h-8 rounded-lg border-inset image-logo"
                src={imageUrl}
                alt="Logo"
              />
            )}

            {imageAccount && (
              <img className="image-account" src={imageAccount} alt="User" />
            )}

            {title && (
              <Box>
                <Text.Title size="small">{title}</Text.Title>

                {subtitle && <Text size="xxSmall">{subtitle}</Text>}
                {levelAccount && (
                  <Box>
                    <Text size="xxSmall">Thành viên vàng</Text>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        }
        // If custom onBackClick is provided, it will be used, otherwise default back behavior
        onBackClick={onBackClick}
      />
    </Box>
  );
};

export default CustomHeader;
