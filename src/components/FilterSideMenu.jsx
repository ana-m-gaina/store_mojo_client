import Box from "@mui/material/Box";
import React from "react";
import { CheckboxFilter } from "./CheckboxFilter";
import { useLocation } from "react-router-dom";

export const FilterSideMenu = ({ filters, setFilters, filterChoices }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(window.location.search);


  const handleClick = (e, name) => {
    const clickedValue = e.target.value;
    setFilters(prevFilters => {
      const currentArray = prevFilters[name] || [];
      if (currentArray.includes(clickedValue)) {
        return {
          ...prevFilters,
          [name]: currentArray.filter(value => value !== clickedValue),
        };
      } else {
        return {
          ...prevFilters,
          [name]: [...currentArray, clickedValue],
        };
      }
    });
  };
  const filterNames = ["sizes", "colors"];

  const handleRadioClick = (e) => {
    const clickedValue = e.target.value;
    setFilters(prevFilters => ({
      ...prevFilters,
      ["categories"]: clickedValue,
    }));
    console.log(filters)
    searchParams.set("category", clickedValue);
    window.history.pushState({}, "", `?${searchParams.toString()}`);
  };

  return (
    <Box sx={{ border: "2px solid theme.palette.primary.main" }}>
      <CheckboxFilter
        key={"categories"}
        name={"categories"}
        choices={filterChoices["categories"]}
        filters={filters}
        setFilters={setFilters}
        handleClick={handleRadioClick}
      />
      {filterNames.map(filter => (
        <CheckboxFilter
          key={filter}
          name={filter}
          choices={filterChoices[filter]}
          filters={filters}
          setFilters={setFilters}
          handleClick={handleClick}
        />
      ))}
    </Box>
  );
};
