import { useState } from "react";
import axios from "axios";

export const useUpdateProfile = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const updateUserProfile = async (address, profileData) => {
        setUpdateSuccess(false);
        setIsUpdating(true);
        setUpdateError(null);

        try{
            await axios.post(`/api/user/updateUserInfo/${address}`, profileData);
            setUpdateSuccess(true);

        } catch (error) {
            console.error('Update Profile Error:', error);
            setUpdateError(error.response.data?.detail)
        }
        setIsUpdating(false);
    }

    return { updateUserProfile, isUpdating, updateError, updateSuccess }
}