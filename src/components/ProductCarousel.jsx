import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useState } from "react";
import { Product } from "./Product";


const ArrowWrapper = styled("div")(({ theme, direction }) => ({
  height: "100",
  display: "flex",
  alignItems: "center",
  p: 0,
}));

const Arrow = styled(IconButton)(({ theme, direction }) => ({
  color:
    theme.palette.mode === "light"
      ? theme.palette.common.black
      : theme.palette.common.white,
  display: "flex",
  width: "40px",
  height: "40px",
  flex: 1,
  opacity: "0.5",
  alignItems: "center",
  left: direction === "left" ? 0 : "auto",
  right: direction === "right" ? 0 : "auto",
}));

export const InfiniteCarousel = popularProducts => {
  const [productsList, setProductsList] = useState(
    popularProducts.popularProducts
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState(0);
  const len = productsList.length;

  const theme = useTheme();
  const isXL = useMediaQuery(theme.breakpoints.up("xl"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  let visibleProductCount;
  if (isXL) {
    visibleProductCount = 6;
  } else if (isLg) {
    visibleProductCount = 5;
  } else if (isMd) {
    visibleProductCount = 4;
  } else if (isSm) {
    visibleProductCount = 3;
  } else {
    visibleProductCount = 2;
  }

  const activeStartIndex = currentIndex;
  const activeEndIndex = (currentIndex + visibleProductCount) % len;
  const activeProducts = productsList.map((product, index) => {
    if (activeStartIndex < activeEndIndex) {
      return {
        ...product,
        active: index >= activeStartIndex && index < activeEndIndex,
      };
    } else {
      return {
        ...product,
        active: index >= activeStartIndex || index < activeEndIndex,
      };
    }
  });

  let visibleProducts = [];
  visibleProducts.push(
    ...activeProducts.slice(count, len).filter(ft => ft.active === true)
  );
  visibleProducts.push(
    ...activeProducts.slice(0, count).filter(ft => ft.active === true)
  );

  useEffect(() => {
    setProductsList(activeProducts);
  }, [currentIndex]);

  const handleClick = direction => {
    if (direction === "right") {
      setCurrentIndex((currentIndex + 1) % len);
      setCount((currentIndex + 1) % len);
    } else {
      setCurrentIndex((currentIndex - 1 + len) % len);
      setCount((currentIndex - 1 + len) % len);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        p: 1,
      }}
    >
      <ArrowWrapper>
        <Arrow
          color={"info"}
          direction={"left"}
          onClick={() => handleClick("left")}
        >
          <ArrowBackIosNewIcon />
        </Arrow>
      </ArrowWrapper>

      <Stack
        direction="row"
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {visibleProducts.map(product => (
          <Product item={product} key={product._id} />
        ))}
      </Stack>

      <ArrowWrapper>
        <Arrow direction={"right"} onClick={() => handleClick("right")}>
          <ArrowForwardIosIcon />
        </Arrow>
      </ArrowWrapper>
    </Box>
  );
};
