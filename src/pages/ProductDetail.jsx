import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { ProductDetailCarousel } from "../components/ProductDetailCarousel";
import { ProductDetailView } from "../components/ProductDetailView";
import { useProductById } from "../hooks/useProductById";

export const ProductDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useProductById(id);

  if (error) return <p> {error.message} </p>;
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Product not found.</p>;

  return (
    <>
      <ProductDetailView product={data} isLoading={isLoading} error={error} />
      <Box sx={{ pr: 4, pl: 4, pt: 2 }}>
        <Typography variant="h6">Description</Typography>
        <Typography sx={{ textAlign: "justify", pt: 1 }}>
          {data.description}
        </Typography>
        <ProductDetailCarousel />
      </Box>
    </>
  );
};
