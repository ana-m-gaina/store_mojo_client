import { styled } from "@mui/material/styles";
import React from "react";
import { useImageQuery } from "../hooks/useImageQuery";

const Image = styled("img")(({ theme }) => ({
  maxWidth: "100%",
  maxHeight: "100%",
  "&:hover": {
    filter: "brightness(60%)",
  },
}));

export const SearchItemProduct = ({ product, filters }) => {
  const { articleNumber, colors } = product;
  let selectedColor;

  if (!filters.colors || filters.colors.length === 0) {
    selectedColor = colors[0];
  } else {
    selectedColor = filters.colors[0];
  }

  const {
    data: imageUrls,
    isLoading,
    isError,
  } = useImageQuery(articleNumber, selectedColor);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading image.</p>;
  }

  return <Image src={imageUrls[0]} alt={`Selected image`} />;
};
