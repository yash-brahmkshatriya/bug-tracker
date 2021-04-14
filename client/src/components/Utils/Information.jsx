import React from "react";
import { Box, Typography, useTheme } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

function Information({
  message,
  icon = (
    <InfoOutlinedIcon
      style={{ fontSize: 40 }}
      // htmlColor={theme.palette.grey[700]}
    />
  ),
}) {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      flex={5}
      justifyContent="center"
      style={{ width: "100%" }}
    >
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Box display="flex" justifyContent="center">
          {icon}
        </Box>
        <Box display="flex" justifyContent="center">
          <Typography
            variant="h5"
            component="h2"
            style={{ color: theme.palette.grey[700] }}
          >
            {message}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Information;
