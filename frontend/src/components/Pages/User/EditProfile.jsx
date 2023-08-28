import { Box, Grid, TextField, Avatar, IconButton, Divider, Typography} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import React from "react";

const EditProfile = () => {
    return(
        <>
        <h1>Edit Profile</h1>
        <Box sx={{ width: "85%", margin: "auto", marginTop: "80px" }}>
            <Grid container spacing={{ xs: 2, }} >
                <Grid item xs >
                    <Box margin="auto" width="65%" >
                    <h2>Username</h2>
                    <TextField 
                        variant="outlined"
                        placeholder="sample username"
                        fullWidth
                        sx={{
                            "& .MuiInputLabel-root": {color: "#8E8894"}, //styles the label
                            "& .MuiOutlinedInput-root": {
                                "& > fieldset": { 
                                    borderColor: "#8E8894",
                                    borderRadius: "10px",
                                    
                                },
                                "&:hover fieldset": {
                                    borderWidth: "2px",
                                    borderColor: "#FFFFFF",
                                },
                            },
                            "& .MuiInputBase-input": { //Styles the base input component itself
                                color: "#FFFFFF",
                            }
                        }}
                    />

                    <h2>Email</h2>
                    <TextField 
                        variant="outlined"
                        placeholder="sample username"
                        fullWidth
                        sx={{
                            "& .MuiInputLabel-root": {color: "#8E8894"}, //styles the label
                            "& .MuiOutlinedInput-root": {
                                "& > fieldset": { 
                                    borderColor: "#8E8894",
                                    borderRadius: "10px",
                                    
                                },
                                "&:hover fieldset": {
                                    borderWidth: "2px",
                                    borderColor: "#FFFFFF",
                                },
                            },
                            "& .MuiInputBase-input": { //Styles the base input component itself
                                color: "#FFFFFF",

                            }
                        }}
                    />

                    <h2>Bio</h2>
                    <TextField 
                        variant="outlined"
                        placeholder="sample username"
                        fullWidth
                        sx={{
                            "& .MuiInputLabel-root": {color: "#8E8894"}, //styles the label
                            "& .MuiOutlinedInput-root": {
                                "& > fieldset": { 
                                    borderColor: "#8E8894",
                                    borderRadius: "10px",
                                    
                                },
                                "&:hover fieldset": {
                                    borderWidth: "2px",
                                    borderColor: "#FFFFFF",
                                },
                            },
                            "& .MuiInputBase-input": { //Styles the base input component itself
                                color: "#FFFFFF",

                            }
                        }}
                    />
                    </Box>
                </Grid>

                <Divider orientation="vertical" flexItem sx={{bgcolor: "#8E8894"}}></Divider>

                <Grid item xs >
                    <Box margin="auto" width="90%" sx={{ flexGrow: 0, position: "relative"}}>
                        <h2>Image &#38; Banner</h2>
                        <img 
                            src="resources/profile-banner.png" 
                            loading="lazy"
                            style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "10px",
                            }}
                        />

                        <IconButton  sx={{ 
                            padding: 0,
                            position: "absolute",
                            bottom: "-30px",
                            left: "30px",
                            zIndex: 1,
                            "&:hover": {
                                "& .edit-icon": {
                                    display:"initial"
                                },
                            }
                        }}>
                            
                            <Avatar alt="Remy Sharp" src="/resources/profile-image.png" sx={{ width: 110, height: 110 }}/>
                            <EditIcon
                                className="edit-icon"
                                fontSize="large"
                                sx={{
                                    display: "none",
                                    position: "absolute",
                                    color: "#FFFFFF",
                                }}
                            />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
            
        </Box>
        </>
    )
}

export default EditProfile;