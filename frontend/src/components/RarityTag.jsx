import { Box } from "@mui/material";
import * as React from "react";

export default function RarityTag({rarity}){

    const styleTag = () => {
        if(rarity > 75 && rarity < 100) return { background: "linear-gradient(45deg, #f06, #9c0)" }; //common
        else if(rarity > 50) return { background: "linear-gradient(45deg, #f06, #9c0)" }; //uncommon
        else if(rarity > 25) return { background: "linear-gradient(45deg, #f06, #9c0)" }; //rare
        else if(rarity > 0) return { background: "linear-gradient(45deg, #f06, #9c0)" }; //epic
        else return { backgroundColor: "#3498db" };
    }

    const tagStyle = styleTag();

    return(
        <Box
            style={{
                padding: "8px 12px",
                borderRadius: "4px",
                color: "#fff",
                fontWeight: "bold",
                textTransform: "uppercase",
                ...tagStyle,
            }}
        >
            {rarity.toFixed(2)}%
        </Box>
    )
}