import React from "react";
import { Carousel } from "../components/Carousel";
import { CategoriesGrid } from "../components/CategoriesGrid";
import { Newsletter } from "../components/Newsletter";
import { InfiniteCarousel } from "../components/ProductCarousel";
import { SectionItem } from "../components/SectionItem";
import useProducts from "../hooks/useProducts";

const promotions = [
  {
    title: "Office Wear",
    url: ".//public/images/promotions/2704_looks_oficina.webp",
  },
  {
    title: "Minimalism",
    url: ".//public/images/promotions/he_interior_nn_2108.webp",
  },
];

export const Home = () => {
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
      <Carousel />
      <CategoriesGrid />
      <SectionItem item={promotions[0]} />
      {data && <InfiniteCarousel popularProducts={popularProducts} />}
      <SectionItem item={promotions[1]} />
      <Newsletter />
    </>
  );
};
