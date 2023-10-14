import { useEffect, useState } from "react";
import axios from "axios";

export const useBuyAsset = () => {
    const [isPurchasing, setIsPurchasing] = useState(false);
    const [purchaseError, setPurchaseError] = useState(null);
    const [purchaseSuccess, setPurchaseSuccess] = useState(false);

    const handleAssetPurchase = async (assetID, purchaseData) => {
        setIsPurchasing(true)
        setPurchaseSuccess(false)
        setPurchaseError(null)

        try {
            await axios.post(`/api/asset/handlePurchase/${assetID}`, purchaseData);
            setPurchaseSuccess(true);
    
        } catch (error) {
            console.error("Purchase Asset Error:", error)
            setPurchaseError(error.response.data?.detail)
        }

        setIsPurchasing(false)
    }
    

    return { handleAssetPurchase, isPurchasing, purchaseError, purchaseSuccess }
}