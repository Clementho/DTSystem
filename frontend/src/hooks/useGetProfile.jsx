import { useEffect, useState } from "react";
import axios from "axios";

export const useGetProfile = () => {
    const [getProfileError, setGetProfileError] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        const fetchProfile = async () => {
            try{
                const response = await axios.get("/api/user/getUserInfo/0xA7cC6ec64a6C9051283C330d19699E25cB2ECEF3");
                setProfileData(response.data);
            } catch (error) {
                setGetProfileError(error);
            }
    
            setIsFetching(false)
        }
    
        fetchProfile();
    }, [])
    

    return { profileData, getProfileError, isFetching }
}