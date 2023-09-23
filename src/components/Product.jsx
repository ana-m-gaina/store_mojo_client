import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { alpha, styled } from "@mui/material/styles";
import React from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../services/ApiClient";

const Image = styled("img")(({ theme }) => ({
  height: "100%",
  width: "100%",
}));

const Item = styled(Paper)(({ theme }) => ({
  position: "relative",
  flex: "1",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  "&:hover": {
    transform: "scale(1.2)",
    cursor: "pointer",
  },
}));

export const Product = ({ item }) => {
  return (
    <Item>
      <Image src={`${baseURL}/images/${item.img}`} />
      <Box
        component={Link}
        to={`/products/find/${item._id}`}
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          flex: "auto",
          display: "flex",
          justifyContent: "center",
          color: "white",
          transition: "background-color 0.3s ease-in-out",
          backgroundColor: theme => alpha(theme.palette.common.black, 0.5),
          opacity: "0",
          "&:hover": {
            opacity: "1",
          },
        }}
      ></Box>
    </Item>
  );
};
