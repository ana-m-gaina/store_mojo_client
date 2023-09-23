import TuneIcon from "@mui/icons-material/Tune";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FilterSideMenu } from "../components/FilterSideMenu";
import { OrderBy } from "../components/OrderBy";
import { ProductSearchGrid } from "../components/ProductSearchGrid";
import { categoriesList } from "../data/categories";
import { products } from "../data/products";

export const SearchPage = () => {
  const isXsScreen = useMediaQuery(theme => theme.breakpoints.down("sm"));
  const [toggle, setToggle] = useState(false);
  const [sort, setSort] = useState("Relevance");

  const searchProducts = products;
  const [selectedProducts, setSelectedProducts] = useState(products);

  const location = useLocation();
  const categorie = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({
    categories: [categorie],
    sizes: [],
    colors: [],
    searchText:"",
    page:""
  });

  const colors = [];
  const sizes = [];

  products.forEach(product => {
    product.colors.forEach(color => {
      if (!colors.includes(color)) {
        colors.push(color);
      }
    });
    product.sizes.forEach(size => {
      if (!sizes.includes(size)) {
        sizes.push(size);
      }
    });
  });

  const filterChoices = {
    categories: categoriesList,
    sizes: sizes,
    colors: colors,
  };

    useEffect(() => {
    const filteredProducts = searchProducts.filter(product => {
      const sizeCondition =
        filters.sizes.length === 0 ||
        filters.sizes.some(size => product.sizes.includes(size));
      const colorCondition =
        filters.colors.length === 0 ||
        filters.colors.some(color => product.colors.includes(color));
      return sizeCondition && colorCondition ;
    });

    setSelectedProducts(filteredProducts);
  }, [filters.sizes, filters.colors, filters.categorie]);

  const handleToggle = toggle => {
    setToggle(prevToggle => !prevToggle);
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            pl: 2,
          }}
        >
          <Button
            color="inherit"
            variant="text"
            onClick={() => handleToggle(toggle)}
          >
            <TuneIcon />
            Filter
          </Button>
          <OrderBy sort={sort} setSort={setSort} />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {toggle && (
            <Box sm={2} sx={{ p: 4 }}>
              <FilterSideMenu
                filters={filters}
                setFilters={setFilters}
                filterChoices={filterChoices}
                sx={{ display: "flex", flex: 1, p: 2 }}
              />
            </Box>
          )}

          <ProductSearchGrid
            filters={filters}
            setFilters={setFilters}
            filterChoices={filterChoices}
            sort={sort}
            setSort={setSort}
            products={products}
          />
        </Box>
      </Box>
    </>
  );
};
