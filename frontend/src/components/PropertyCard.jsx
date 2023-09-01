import { Box, Typography } from "@mui/material";
import * as React from "react";

export default function PropertyCard({rarity}){

    const styleTag = () => {
        if(rarity >= 75 && rarity <= 100) return { background: "linear-gradient(45deg, #5cd07d, #3bcf3d)" }; //common
        else if(rarity >= 50) return { background: "linear-gradient(45deg, #28e2f0, #0075ff)" }; //uncommon
        else if(rarity >= 25) return { background: "linear-gradient(45deg, #f06, #99cc00)" }; //rare
        else if(rarity > 0) return { background: "linear-gradient(45deg, #ff0066, #0075ff)" }; //epic
        else return { backgroundColor: "#3498db" };
    }

    const tagStyle = styleTag();

    return(
        <Box sx={{
            bgcolor: "#1B151F",
            borderRadius: "10px",
            padding: "20px",

        }}>
            <Typography variant="subtitle1" sx={{color: "#AEAEAE"}}>Suit</Typography>
            <Typography variant="h5" fontWeight="bold">Cosmic Skeletal</Typography>
            <Box
                style={{
                    margin: "50px 0 0 auto",
                    width: "50px",
                    height: "20px",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    color: "#fff",
                    fontWeight: "bold",
                    textAlign: "center",
                    ...tagStyle,
                }}
            >
                {rarity}%
            </Box>
        </Box>
    )
}