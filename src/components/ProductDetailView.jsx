import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sizeList } from "../data/categories";
import { cartAdd } from "../services/cartService";
import { ColorRadioGroup } from "./ColorRadioGroup";
import { ProductImageList } from "./ProductImageList";

export const ProductDetailView = ({ product, isLoading, error }) => {
  const {
    articleNumber,
    careGuidelines,
    composition,
    origin,
    price,
    productType,
    title,
    variant,
  } = product;

  let colors = [];
  let sizes = [];
  colors = variant.map(item => item.color);

  const [selectedColor, setSelectedColor] = useState(colors[0]);

  let selectedVariant = variant.filter(item => item.color === selectedColor);
  selectedVariant = selectedVariant[0];

  selectedVariant.sizeInfo.forEach(size => {
    if (!sizes.includes(size.size)) {
      sizes.push(size.size);
    }
  });

  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  const handleChangeMultiple = event => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }

    setSelectedSize(value);
  };

  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);

  const handleClick = () => {
    dispatch(cartAdd({ product, selectedSize, selectedColor, user }));
  };

  return (
    <Box sx={{ m: "auto" }}>
      <Grid container>
        <Grid item xs={12} sm={8}>
          <ProductImageList
            selectedVariant={selectedVariant}
            selectedColor={selectedColor}
            isLoading={isLoading}
            error={error}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            position: "sticky",
            top: "0",
            height: "100%",
            p: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="h6"
              sx={{ display: "flex", justifyContent: "start", flex: 1 }}
            >
              {title}
            </Typography>
            <Typography
              variant="h6"
              sx={{ display: "flex", justifyContent: "end", flex: 1 }}
            >
              {price.toLocaleString("en-US", {
                style: "currency",
                currency: "EUR",
              })}
            </Typography>
          </Box>

          <Typography variant="body2"> Ref {articleNumber} </Typography>

          <Box sx={{ display: "flex", pt: 3, pb: 3 }}>
            <ColorRadioGroup
              colors={colors}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              sx={{ display: "flex", justifyContent: "start", flex: 1 }}
            />

            <Typography
              variant="body2"
              sx={{ display: "flex", justifyContent: "end", flex: 1 }}
            >
              {selectedColor}
            </Typography>
          </Box>

          <FormControl sx={{ mb: 4, width: "100%" }}>
            <InputLabel htmlFor="select-size">Sizes</InputLabel>
            <Select
              native
              value={selectedSize}
              onChange={handleChangeMultiple}
              label="Native"
              inputProps={{
                id: "select-multiple-native",
              }}
            >
              {sizeList.map(size => (
                <option
                  key={size}
                  value={size}
                  disabled={!sizes.includes(size)}
                  style={{
                    color: !sizes.includes(size) ? "gray" : "black",
                    fontWeight: !sizes.includes(size) ? "light" : "bold",
                  }}
                >
                  {size}
                </option>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: "flex" }}>
            <Button
              variant="contained"
              sx={{ display: "flex", flex: 1, height: "50px" }}
              onClick={handleClick}
            >
              Add to cart
            </Button>
          </Box>

          <Typography
            variant="h6"
            sx={{ display: "flex", justifyContent: "start", pt: 3 }}
          >
            Free delivery to store
          </Typography>

          <Typography variant="body2" sx={{ pt: 1 }}>
            Care guidelines: {careGuidelines}
          </Typography>

          <Typography variant="body2" sx={{ pt: 1 }}>
            Composition: {composition}
          </Typography>

          <Typography variant="body2" sx={{ pt: 1 }}>
            Origin: {origin}
          </Typography>

          <Typography variant="body2" sx={{ pt: 1 }}>
            Type: {productType}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
