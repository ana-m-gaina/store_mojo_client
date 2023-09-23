import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Radio from "@mui/material/Radio";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { heroData } from "../data/heroData";
import { Carouseltem } from "./Carouseltem";

const Arrow = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
}));

export const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  let slides = heroData;

  const handleChange = index => {
    setActiveIndex(index);
  };

  const handleClick = direction => {
    if (direction === "left") {
      activeIndex > 0
        ? setActiveIndex(activeIndex - 1)
        : setActiveIndex(heroData.length - 1);
    } else {
      activeIndex < heroData.length - 1
        ? setActiveIndex(activeIndex + 1)
        : setActiveIndex(0);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vW",
        backgroundColor: "yellow",
        "&:hover": {
          "& img": {
            filter: "brightness(100%)",
          },
          "& Button": {
            backgroundColor: "rgba(0, 0, 0, 0)",
            color: "white",
          },
        },
      }}
    >
      <Box
        maxHeight="lg"
        sx={{
          display: "flex",
          width: "100vw",
          position: "relative",
          transform: `translateX(-${activeIndex * 100}vw)`,
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {slides.map(slide => (
          <Carouseltem item={slide} key={slide._id} />
        ))}
      </Box>

      <Box
        sx={{
          position: "absolute",
          width: "100vW",
          height: "100%",
          display: "flex",
          top: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flex: 1,
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Arrow
            direction={"left"}
            onClick={() => handleClick("left")}
            disableRipple={true}
          >
            <ArrowBackIosNewIcon />
          </Arrow>
        </Box>
        <Box
          sx={{
            flex: 10,
            backgroundColor: "green",
            display: "flex",
            justifyContent: "center",
            marginTop: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              height: "5%",
              pb: 2,
              position: "absolute",
              bottom: 0,
              opacity: 0.7,
              transform: "scale(0.5)",
            }}
          >
            {slides.map((slide, index) => (
              <Radio
                key={slide._id}
                checked={activeIndex === index}
                onClick={() => handleChange(index)}
                sx={{
                  color: theme => theme.palette.common.white,
                  "&.Mui-checked": {
                    color: theme => theme.palette.common.white,
                  },
                }}
              />
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Arrow
            direction={"right"}
            onClick={() => handleClick("right")}
            disableRipple={true}
          >
            <ArrowForwardIosIcon />
          </Arrow>
        </Box>
      </Box>
    </Box>
  );
};
