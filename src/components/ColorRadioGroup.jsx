import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

export const ColorBox = styled(Box)(({ theme, value }) => ({
  width: "20px",
  height: "20px",
  backgroundColor: `${value}`,
  display: "flex",
  margin: 2,
  flexWrap: "wrap",
  justifyContent: "start",
  border:
    `${value}` === "White" || `${value}` === "Ecru"
      ? `1px solid ${theme.palette.primary.main}`
      : "none",
}));

export const WhiteMarginBox = styled(Box)(({ theme, selected }) => ({
  backgroundColor: selected ? "white" : "transparent",
  display: "flex",
  margin: selected ? 4 : 2 ,
  border: selected ? `2px solid ${theme.palette.primary.main}` : "none",
  
}));

export const ColorRadioGroup = ({
  colors,
  selectedColor,
  setSelectedColor,
  setSelectedImageIndex,
}) => {
  const handleImageClick = color => {
    setSelectedColor(color);
    setSelectedImageIndex(0);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {colors.map((color, index) => (
        <WhiteMarginBox key={index} selected={color === selectedColor}>
          <ColorBox value={color} onClick={() => handleImageClick(color)} />
        </WhiteMarginBox>
      ))}
    </Box>
  );
};
