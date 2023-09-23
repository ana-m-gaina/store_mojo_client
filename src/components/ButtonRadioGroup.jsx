import { Box, alpha } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import React from "react";

const SizesButton = styled(Button)(({ theme, selected }) => ({
  display: "flex",
  backgroundColor: alpha(theme.palette.common.black, 0.1),
  margin: 5,
  border: selected ? `1px solid ${theme.palette.common.black}` : `none`,
}));

export const ButtonRadioGroup = ({ sizes, selectedSize, setSelectedSize }) => {
  const handleImageClick = sizes => {
    setSelectedSize(sizes);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {sizes.map((size, index) => (
        <SizesButton
          size="small"
          variant="outlined"
          color="inherit"
          key={index}
          selected={size === selectedSize}
          onClick={() => handleImageClick(size)}
        >
          {size}
        </SizesButton>
      ))}
    </Box>
  );
};
