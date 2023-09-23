import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { default as React } from "react";
import { Link } from "react-router-dom";

const Image = styled("img")(({ theme }) => ({
  display: "block",
  height: "auto",
  maxWidth: "100%",
  minWidth: "100%",

  filter: "brightness(80%)",
  transition: "filter 0.3s ease-in-out",
  [theme.breakpoints.down("sm")]: {
    objectFit: "cover",
  },
}));

export const SectionItem = ({ item }) => {
  return (
    <Box
      component={Link}
      to="/products"
      sx={{
        position: "relative",
        minWidth: "100%",
        minHeight: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          "& img": {
            filter: "brightness(100%)",
          },
          "& Button": {
            backgroundColor: "rgba(0, 0, 0, 0)",
            color: "white",
            transform: "scale(1.5)",
          },
        },
      }}
    >
      <Image src={item.url} />
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          top: "50%",
          transform: "translate(0%, -50%)",
          "&:hover": {
            filter: "brightness(900%)",
          },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: theme => theme.palette.common.white,
            fontWeight: 900,
            fontSize: { xs: 20, sm: 40, md: 80, lg: 100 },
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          {item.title}
        </Typography>
        <Button
          variant="contained"
          size="medium"
          sx={{
            backgroundColor: theme => theme.palette.common.white,
            color: "black",
            border: "1px solid white",
            transition: "transform, background-color 0.3s ease-in-out",
          }}
          disableElevation
        >
          Discover
        </Button>
      </Box>
    </Box>
  );
};
