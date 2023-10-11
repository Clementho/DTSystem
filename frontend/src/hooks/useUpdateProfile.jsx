import { useState } from "react";
import axios from "axios";

export const useUpdateProfile = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const updateUserProfile = async (profileData) => {
        setUpdateSuccess(false);
        setIsUpdating(true);
        setUpdateError(null);

        try{
            await axios.post("/api/user/updateUserInfo", profileData);
            setUpdateSuccess(true);

        } catch (error) {
            console.error('Error:', error);
            setUpdateError(error.response.data?.detail)
        }
        setIsUpdating(false);
    }

    return { updateUserProfile, isUpdating, updateError, updateSuccess }
}