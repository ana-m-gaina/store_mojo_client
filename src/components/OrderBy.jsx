import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from "react";

export const OrderBy = ({ sort, setSort }) => {
  const handleChange = event => {
    setSort(event.target.value);
  };

  return (
    <FormControl
      sx={{
        m: 1,
        minWidth: 80,
        maxWidth: 200,
      }}
      size="small"
    >
      <InputLabel id="demo-simple-select-label">Order by</InputLabel>
      <Select
        labelId="simple-select-label"
        id="simple-select"
        value={sort}
        label="Order by"
        autoWidth
        onChange={handleChange}
      >
        <MenuItem value={"Relevance"}>Relevance</MenuItem>
        <MenuItem value={"Price ascending"}>Price ascending</MenuItem>
        <MenuItem value={"Price descending"}>Price descending</MenuItem>
      </Select>
    </FormControl>
  );
};
