import React, { useState, useEffect } from "react";
import { Box, Grid, TextField, Avatar, IconButton, Typography, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SnackBar from "../components/SnackBar";

import { useGetProfile } from "../hooks/useGetProfile";
import { useUpdateProfile } from "../hooks/useUpdateProfile";


const EditProfile = () => {
    const { profileData, getProfileError, isFetching } = useGetProfile();
    const { updateUserProfile, isUpdating, updateError, updateSuccess } = useUpdateProfile();

     // Snackbar states
    const [snackMessage, setSnackMessage] = useState("");
    const [snackSeverity, setSnackSeverity] = useState("");

    // Set initial profile form fields
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [biography, setBiography] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSnackMessage("");

        const newProfileData = {
            "name": username,
            "email": email,
            "biography": biography
        }

        await updateUserProfile(newProfileData);
    }

    //If profile data is finished fetching, initialise the input fields with the profile data
    useEffect(() => {

        if (profileData) {
            setUsername(profileData.name || "");
            setEmail(profileData.email || "");
            setBiography(profileData.biography || "");
        }

    }, [profileData]);

    useEffect(() => {

        if(getProfileError || updateError) {
            setSnackMessage(updateError);
            setSnackSeverity("error");
        } else if (updateSuccess) {
            setSnackMessage("Profile updated successfully!");
            setSnackSeverity("success");
        }

    }, [ getProfileError, updateError, updateSuccess])

    return(
        <>
        <SnackBar message={snackMessage} severity={snackSeverity} />
        <SnackBar message={isUpdating ? "Updating user profile...": ""} severity="info" />

        <h1>Edit Profile</h1>
        <Box sx={{ width: "85%", margin: "auto", marginTop: "80px" }}>
            <Grid container spacing={{ xs: 2 }} >
                <Grid item xs={12} md={6} order={{xs: 2, md: 1}} >
                    <form 
                        style={{
                            margin: "auto",
                            width: {xs:"90%", md:"65%"},
                        }}
                        onSubmit={handleSubmit}
                    >
                    <h2>Username</h2>
                    <TextField 
                        variant="outlined"
                        placeholder="Enter your username"
                        fullWidth
                        value={isFetching ? "Fetching profile..." : username}
                        onChange={(e) => setUsername(e.target.value)}
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
                        placeholder="Enter your email address"
                        fullWidth
                        value={isFetching ? "Fetching profile..." : email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        placeholder="Write a short bio!"
                        fullWidth
                        value={isFetching ? "Fetching profile..." : biography}
                        onChange={(e) => setBiography(e.target.value)}
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

                    <Button
                        disabled={isUpdating}
                        variant="contained"
                        type="submit"
                        sx={{
                            display: "block",
                            marginTop: "50px",
                            marginX: {xs: "auto", md: "0"},
                            padding: "10px 20px",
                            fontSize: "1.1em",
                            fontWeight: "bold",
                            bgcolor: "#4800C6",
                            "&:hover": {
                              bgcolor: "#7331e8",
                            },
                          }}
                    >
                        <Typography>Save Changes</Typography>
                    </Button>
                    </form>
                </Grid>

                
                <Grid item xs={12} md={6} order={{xs: 1, md: 2}}>
                    <Box margin="auto" width="90%" sx={{ flexGrow: 0, position: "relative"}}>
                        <h2>Image &#38; Banner</h2>
                        <Box sx={{
                            "&:hover":{
                                cursor: "pointer",
                                "& .hover-background-banner": {
                                    display: "initial"
                                },
                                "& .edit-icon-banner": {
                                    display: "initial"
                                },
                            }}
                        }>
                            <img 
                                src="resources/profile-banner.png" 
                                loading="lazy"
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    borderRadius: "10px",
                                }}
                            />
                            <Box // Semi-transparent white background on hover
                                className="hover-background-banner"
                                sx={{
                                    position: "absolute",
                                    left: 0,
                                    width: "100%",
                                    height: "80%",
                                    backgroundColor: "rgba(255, 255, 255, 0.3)", 
                                    borderRadius: "10px",
                                    display: "none",
                                }}
                            />
                            <EditIcon
                                className="edit-icon-banner"
                                sx={{
                                    fontSize: "10vh",
                                    position: "absolute",
                                    left: "45%",
                                    bottom: "25%",
                                    color: "#FFFFFF",
                                    display: "none",
                                }}
                            />
                        </Box>

                        <IconButton  sx={{ 
                            padding: 0,
                            position: "absolute",
                            bottom: "-30px",
                            left: {
                                xs: "20px",
                                md: "30px",
                            },
                            zIndex: 1,
                            "&:hover": {
                                "& .edit-icon-avatar": {
                                    display:"initial",
                                },
                                "& .hover-background-avatar": {
                                    display: "initial",
                                }
                            }
                        }}>
                            
                            <Avatar alt="Remy Sharp" src="/resources/profile-image.png" sx={{ width: {xs: 80, sm:110}, height: {xs: 80, sm:110} }}/>
                            <Box // Semi-transparent white background on hover
                                className="hover-background-avatar"
                                sx={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "rgba(255, 255, 255, 0.3)", 
                                    borderRadius: "50%",
                                    display: "none",
                                }}
                            />
                            <EditIcon
                                className="edit-icon-avatar"
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