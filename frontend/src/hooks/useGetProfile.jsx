import { useEffect, useState } from "react";
import axios from "axios";

export const useGetProfile = () => {
    const [getProfileError, setGetProfileError] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const [isFetching, setIsFetching] = useState(true)

    const fetchProfile = async (address) => {
        setIsFetching(true)

        try{
            const response = await axios.get(`/api/user/getUserInfo/${address}`);
            setProfileData(response.data);
        } catch (error) {
            setGetProfileError(error);
        }

        setIsFetching(false)
    }


    return { fetchProfile, profileData, getProfileError, isFetching }
}