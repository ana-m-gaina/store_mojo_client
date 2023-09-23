import Typography from "@mui/material/Typography";
import React from "react";
import { InfiniteCarousel } from "../components/ProductCarousel";
import useProducts from "../hooks/useProducts";

export const ProductDetailCarousel = () => {
  const { data, isLoading, error } = useProducts("women");

  if (error) return <p> {error.message} </p>;
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>data not found.</p>;

  const popularProducts =
    data &&
    data.map(product => ({
      ...product,
      active: false,
      img: product.variant[0].images[0],
    }));
  return (
    <>
      <Typography variant="h6" sx={{ pt: 3 }}>
        FREQUENTLY BOUGHT TOGETHER
      </Typography>
      {data && <InfiniteCarousel popularProducts={popularProducts} />}
    </>
  );
};
