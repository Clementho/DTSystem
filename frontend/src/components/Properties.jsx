import { Grid } from "@mui/material";
import * as React from "react";
import PropertyCard from "./PropertyCard";

export default function Properties(){

    return (
        <Grid container spacing={4} columns={{xs:1, sm:2, md:3, lg:4}}>
            <Grid item xs={1}>
                <PropertyCard rarity={75}/>
            </Grid>

            <Grid item xs={1}>
                <PropertyCard rarity={65}/>
            </Grid>

            <Grid item xs={1}>
                <PropertyCard rarity={27}/>
            </Grid>

            <Grid item xs={1}>
                <PropertyCard rarity={12}/>
            </Grid>

            <Grid item xs={1}>
                <PropertyCard rarity={9}/>
            </Grid>
        </Grid>
    )


}