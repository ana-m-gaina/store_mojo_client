import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import React from "react";
import { CartGrid } from "../components/CartGrid";
import { InfiniteCarousel } from "../components/ProductCarousel";
import useProducts from "../hooks/useProducts";

export const Cart = () => {
   const { data, isLoading, error } = useProducts("women");
   const popularProducts =
     data &&
     data.map(product => ({
       ...product,
       active: false,
       img: product.variant[0].images[0],
     }));
  return (
    <>
      <CartGrid />
      <Divider />
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          display: "flex",
          justifyContent: "center",
          pt: 4,
        }}
      >
        YOU MIGHT ALSO LIKE
      </Typography>
      {data && <InfiniteCarousel popularProducts={popularProducts} />}
      <Divider />
    </>
  );
};
