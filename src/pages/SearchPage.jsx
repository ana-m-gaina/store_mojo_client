import TuneIcon from "@mui/icons-material/Tune";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FilterSideMenu } from "../components/FilterSideMenu";
import { OrderBy } from "../components/OrderBy";
import { ProductSearchGrid } from "../components/ProductSearchGrid";
import { categoriesList } from "../data/categories";
import useProducts from "../hooks/useProducts";

export const SearchPage = () => {
  const [toggle, setToggle] = useState(false);
  const [sort, setSort] = useState("Relevance");
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let category = searchParams.get("category");
  const searchText = searchParams.get("text");
   const [filters, setFilters] = useState({
    categories: category || "",
    sizes: [],
    colors: [],
  });

   const { data, isLoading, error } = useProducts(
     filters.categories,
     searchText
   );

  useEffect(() => {
    setFilters({ categories: category || "", sizes: [], colors: [] });
    console.log(filters);
  }, [category, searchText]);

  const colors = [];
  data &&
    data.forEach(product => {
      product.variant.forEach(variant => {
        if (!colors.includes(variant.color)) {
          colors.push(variant.color);
        }
      });
    });

  const sizes = [];
  data &&
    data.forEach(product => {
      product.variant.forEach(variant => {
        variant.sizeInfo.forEach(size => {
          if (!sizes.includes(size.size)) {
            sizes.push(size.size);
          }
        });
      });
    });

  const sizeOrder = {
    XXS: 0,
    XS: 1,
    S: 2,
    M: 3,
    L: 4,
    XL: 5,
    XXL: 6,
    "3XL": 7,
  };

  sizes.sort((a, b) => {
    return sizeOrder[a] - sizeOrder[b];
  });

  const filterChoices = {
    categories: categoriesList,
    sizes: sizes,
    colors: colors.sort(),
  };

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
            data={data}
            error={error}
            isLoading={isLoading}
            sort={sort}
            filters={filters}
          />
        </Box>
      </Box>
    </>
  );
};
