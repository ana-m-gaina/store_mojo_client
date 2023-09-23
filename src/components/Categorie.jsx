import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { alpha, styled } from "@mui/material/styles";
import React from "react";
import { Link } from "react-router-dom";

const Image = styled("img")(({ theme }) => ({
  height: "100%",
  width: "100%",
}));

const Item = styled(Paper)(({ theme }) => ({
  position: "relative",
  flex: "1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  borderRadius: 0,
}));

export const Categorie = ({ categorie }) => {
  return (
    <Item
      component={Link}
      to={`/products?category=${categorie.title}`}
      sx={{
        "&:hover": {},
      }}
    >
      <Image src={categorie.url} />
      <Typography
        variant="h6"
        color="text.primary"
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          color: "white",
          transition: " 0.3s ease-in-out",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          "&:hover": {
            backgroundColor: theme => alpha(theme.palette.common.black, 0.5),
            transform: "scale(1.8)",
          },
        }}
      >
        {categorie.title.toUpperCase()}
      </Typography>
    </Item>
  );
};
