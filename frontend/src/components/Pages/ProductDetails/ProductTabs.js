import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

// https://mui.com/material-ui/react-tabs/
export default function ColorTabs() {
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "65%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="white"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Overview" />
        <Tab value="two" label="History" />
        <Tab value="three" label="Properties" />
      </Tabs>
    </Box>
  );
}
