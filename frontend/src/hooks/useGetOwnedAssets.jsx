import { useState } from "react";
import axios from "axios";

export const useGetOwnedAssets = () => {
  const [ownedAssets, setOwnedAssets] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [getOwnedAssetsError, setGetOwnedAssetsError] = useState(null);

  // Define a function to fetch owned assets
  const fetchOwnedAssets = async (address) => {
    setIsFetching(true);

    try {
      // Make an API request to fetch owned assets for the user
      const response = await axios.get(`/api/db/get_assets_by_owner/${address}`);
      setOwnedAssets(response.data);

    } catch (error) {
      setGetOwnedAssetsError(error.message);

    } 

    setIsFetching(false);
  };

  return { ownedAssets, fetchOwnedAssets, isFetching, getOwnedAssetsError };
};
