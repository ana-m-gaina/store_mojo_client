import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { default as React } from "react";

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

export const Carouseltem = ({ item }) => {
  return (
    <Box
      sx={{
        position: "relative",
        minWidth: "100%",
        minHeight: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
      </Box>
    </Box>
  );
};
