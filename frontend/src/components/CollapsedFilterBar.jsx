import React from "react";
import TuneIcon from '@mui/icons-material/Tune';
import Button from '@mui/material/Button';

export default function CollapsedFilterBar ({setExpandFilter}) {

    const handleClick = () => {
        setExpandFilter(true)
    }

    return (
    <Button
        size='large'
        variant="contained"
        onClick={handleClick}
        sx={{
        bgcolor: '#1B151F',
        "&:hover": {
            bgcolor: '#29252e',
            color: "#7331e8"
        }
        }}
    >
        <TuneIcon/>
    </Button>
    )
}