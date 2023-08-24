import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TuneIcon from '@mui/icons-material/Tune';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

//https://mui.com/material-ui/react-accordion/

export default function ExpandedFilterBar({setExpandFilter}) {

    const propertiesList = [
        "Clothes",
        "Hat",
        "Species",
        "Background",
        "Eyes"
    ]

    const handleClick = () => {
        setExpandFilter(false)
    }

    const accordions = propertiesList.map((property, index) => (
        <>
        <Accordion sx={{
            "&.MuiAccordion-root": {
                bgcolor: "#1B151F",
                color: "#8E8894"
            }
        }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color:"#8E8894" }}/>}
          aria-controls={`${property}-content`}
          id={`${property}-header`}
        >
          <Typography>{property}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      {index !== (propertiesList.length - 1) && <hr/>}
      </>
    ))


  return (
    <Box sx={{width: "30%", padding: "10px", bgcolor: "#1B151F"}}>
        <Box display="flex" alignItems="center" position="relative" justifyContent="center">
        <Button
            size='large'
            variant="text"
            onClick={handleClick}
            sx={{
                position: "absolute",
                left: 0,
                color: "#FFFFFF",
                "&:hover": {
                    color: '#7331e8'
                }
            }}
        >
            <TuneIcon color='#FFFFFF'/>
        </Button>

        <h2>Filters</h2>
        </Box>
        
        <Box sx={{ padding: "0px 10px" }}>{accordions}</Box>
    </Box>
  );
}
