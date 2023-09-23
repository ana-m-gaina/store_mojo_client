import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import React from "react";
import { baseURL } from "../services/ApiClient";

const Image = styled("img")(({ theme, selected }) => ({
  width: "100%",
  height: "auto",
  display: "flex",
  flex: "1",
  justifyContent: "center",
  alignItems: "center",
  border: selected ? `3px solid ${theme.palette.common.black}` : "none",
}));

export const ProductImageList = ({ selectedVariant, error, isLoading }) => {
  const imageUrls = selectedVariant.images;
  const imageNumber = imageUrls ? imageUrls.length : 2;
  const differentLastRow = imageNumber % 2 !== 0;
  let columnWidth = 6;

  if (error) return <p> {error.message} </p>;
  if (isLoading) return <p>Loading...</p>;
  if (!selectedVariant) return <p>Image not found.</p>;

  return (
    <Grid container spacing={0.2}>
      {imageUrls.map((img, index) => {
        if (differentLastRow && index >= imageNumber - 3) {
          columnWidth = 4;
        }
        return (
          <Grid item xs={columnWidth} key={index}>
            <Image src={`${baseURL}/images/${img}`} alt={`Image ${index}`} />
          </Grid>
        );
      })}
    </Grid>
  );
};
