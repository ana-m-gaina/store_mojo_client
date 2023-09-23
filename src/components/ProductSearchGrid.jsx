import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../services/ApiClient";

const Image = styled("img")(({ theme }) => ({
  width: "100%",
  maxHeight: "100%",
}));

const ColorBox = styled(Box)(({ theme, selected, value }) => ({
  width: "30px",
  height: "30px",
  backgroundColor: `${value}`,
  display: "flex",
  margin: 1,
  flexWrap: "wrap",
  justifyContent: "start",
  border: selected ? `3px solid ${theme.palette.secondary.main}` : "none",
}));

export const ProductSearchGrid = ({
  data,
  error,
  isLoading,
  sort,
  filters,
}) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  const sortFunction = (a, b) => {
    if (sort === "Price ascending") {
      return a.price - b.price;
    } else if (sort === "Price descending") {
      return b.price - a.price;
    }
    return 0;
  };

  useEffect(() => {
    if (!isLoading) {
      const filtered = data.filter(product => {
        const sizeCondition =
          filters.sizes.length === 0 ||
          product.variant.some(variant =>
            variant.sizeInfo.some(sizeInfo =>
              filters.sizes.includes(sizeInfo.size)
            )
          );
        const colorCondition =
          filters.colors.length === 0 ||
          product.variant.some(variant =>
            filters.colors.includes(variant.color)
          );

        return sizeCondition && colorCondition;
      });
      setFilteredProducts(filtered.sort(sortFunction));
    }
  }, [data, filters, sort]);

  if (error) return <p> {error.message} </p>;
  if (isLoading) return <p>Loading...</p>;
  if (!data || data.length === 0) return <p>No products found.</p>;
  if (!filteredProducts || filteredProducts.length === 0)
    return <p>No products found.</p>;

  return (
    <Grid
      spacing={0.2}
      container
      sx={{
        display: "flex",
        justifyContent: "start",
      }}
    >
      {!isLoading &&
        filteredProducts.map(product => (
          <Grid item xs={6} sm={4} key={product._id} sx={{ pb: 6 }}>
            <Box
              component={Link}
              to={`/products/find/${product._id}`}
              sx={{
                "&:hover:img": {
                  filter: "brightness(0.8)",
                },
              }}
            >
              <Image
                src={`${baseURL}/images/${product.variant[0].images[0]}`}
                alt={`Selected image`}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                pl: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">{product.title}</Typography>
              </Box>

              <Typography variant="h6">{product.price}EUR</Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "start",
                }}
              >
                {product.variant.map(variant => (
                  <ColorBox
                    key={variant._id}
                    sx={{
                      border: "0.2px solid grey",
                      borderRadius: "50%",
                      transform: "scale(0.6)",
                      m: 0,
                    }}
                    value={variant.color}
                  />
                ))}
              </Box>
            </Box>
          </Grid>
        ))}

      {/* 




              
             
                
              </Box>
            </Box>
          </Grid> 
        ))}*/}
    </Grid>
  );
};
