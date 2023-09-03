import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TuneIcon from '@mui/icons-material/Tune';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

//https://mui.com/material-ui/react-accordion/

export default function ExpandedFilterBar({expandFilter, setExpandFilter}) {

    const subPropertiesList = {
        "Clothes": ["Shirt", "Pants", "Shoes"],
        "Hat": ["Top Hat", "Baseball Cap", "Fedora"],
        "Species": ["Human", "Alien", "Animal"],
        "Background": ["City", "Nature", "Space"],
        "Eyes": ["Blue", "Green", "Brown"]
    };

    const handleClick = () => {
        setExpandFilter(false)
    }

    const accordions = Object.keys(subPropertiesList).map((property, index) => (
        <>
            <Accordion 
                key={property}
                sx={{
                    "&.MuiAccordion-root": {
                        bgcolor: "#1B151F",
                        color: "#8E8894"
                    },
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color:"#8E8894" }}/>}
                    aria-controls={`${property}-content`}
                    id={`${property}-header`}
                    sx={{
                        marginTop: {
                            xs: "50px",
                            md: "0"
                        }
                    }}
                >
                    <Typography>{property}</Typography>
                </AccordionSummary>
            
                <AccordionDetails>
                    <FormGroup>
                        {subPropertiesList[property].map((subProperty, subIndex) => (
                            <FormControlLabel
                                key={`${property}-${subIndex}`}
                                control={
                                    <Checkbox sx={{
                                        color: "#8E8894",
                                        "&.Mui-checked": {
                                            color: "#4800C6"
                                        },
                                    }}/>
                                }
                                label={subProperty}
                            />
                        ))}
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
            <hr/>
        </>
    ));


  return (
    <Box 
        sx={{
            width: {
                xs: "100vw",
                md:"30%",
            },
            height: {
                xs: "100vh",
                md:"fit-content",
            },
            padding: "10px", 
            paddingBottom:"50px",
            bgcolor: "#1B151F",
            position: {
                xs: "fixed",
                md: "initial"
            },
            top: {
                xs: 0,
                md: "initial"
            },
            left: {
                xs: 0,
                md: "initial"
            },
            zIndex: {
                xs: 2,
                md: 0,
            },
            overflowY: {
                xs: "scroll",
                md: "initial",
            }
        }}>
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
        
        <Box paddingX="10px">
        <Box display="flex" alignItems="center">
            <h3>Price</h3>
            <Button
                size="medium"
                variant='outlined'
                sx={{
                    marginLeft: "auto",
                    color: "#4800C6",
                    borderColor: "#4800C6",
                    fontWeight: "bold",
                    "&:hover":{
                        bgcolor: "#4800C6",
                        borderColor: "#4800C6",
                        color: "#FFFFFF"
                    }
                }}
            >Apply</Button>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="flex-start" padding="10px 0px" columnGap="20px">
            <TextField
                label="Min" 
                id="Min" 
                variant='outlined'
                sx={{
                    "& .MuiInputLabel-root": {color: "#8E8894"}, //styles the label
                    "& .MuiOutlinedInput-root": {
                        "& > fieldset": { 
                            borderColor: "#8E8894",
                            borderRadius: "10px",
                            backgroundColor: "transparent"
                        },
                        "&:hover fieldset": {
                            borderWidth: "2px",
                            borderColor: "#FFFFFF",
                        },
                    },
                    "& .MuiInputBase-input": { //Styles the base input component itself
                        color: "#8E8894",
                        width: "60px",
                        maxHeight: "15px"
                    }
                }}
            />
            <span>to</span>
            <TextField
                label="Max" 
                id="Max" 
                variant='outlined'
                sx={{
                    "& .MuiInputLabel-root": {color: "#8E8894"}, //styles the label
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": { 
                            borderColor: "#8E8894",
                            borderRadius: "10px",
                            backgroundColor: "transparent"
                        },
                      "&:hover fieldset": {
                            borderWidth: "2px",
                            borderColor: "#FFFFFF",
                        },
                    },
                    "& .MuiInputBase-input": { //Styles the base input component itself
                        color: "#8E8894",
                        width: "60px",
                        maxHeight: "15px",
                    }
                }}
            />
        </Box>
        <hr/>
        </Box>
        
        <Box sx={{ 
            padding: "0px 10px",
            marginTop: {
                xs: "100px",
                md: "0"
            }
        }}>
            <h3>Properties</h3>
            {accordions}
        </Box>
    </Box>
  );
}