import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


//https://mui.com/material-ui/react-select/

const sortOptions = [
    "Price (Low to High)",
    "Price (High to Low)",
]

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            backgroundColor: "#1B151F",
            color: "#8E8894",
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
}

export default function SortOptionsBar({ products, setFilteredProducts }) {
  const [sortOption, setSortOption] = React.useState(sortOptions[0]);

  const handleChange = (event) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);

    // Sort the products based on the selected sorting option
    const sortedProducts = [...products];
    if (selectedOption === "Price (Low to High)") {
      sortedProducts.sort((a, b) => a.assetPrice - b.assetPrice);
    } else if (selectedOption === "Price (High to Low)") {
      sortedProducts.sort((a, b) => b.assetPrice - a.assetPrice);
    }
    // Update the filtered products with the sorted products
    setFilteredProducts(sortedProducts);
  };

  return (
    <div style={{marginLeft: "auto", marginRight: "-5px"}}>
      <FormControl sx={{ m: 1, minWidth: 80}}>
        <InputLabel id="demo-simple-select-autowidth-label" sx={{color:"#8E8894"}}>Order By</InputLabel>
        <Select
          labelId="sortOptionsBar-label"
          id="sortOptionsBar"
          value={sortOption}
          onChange={handleChange}
          autoWidth
          label="Order By"
          MenuProps={MenuProps}
          defaultValue={sortOptions[0]}
          sx={{
            bgcolor: "#1B151F",
            color: "#FFFFFF",
            "& .MuiSelect-icon": {
              color: "#FFFFFF",
            },
          }}
        >
            {sortOptions.map((option) => (
                <MenuItem sx={{color:"#8E8894"}} value={option}>{option}</MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
