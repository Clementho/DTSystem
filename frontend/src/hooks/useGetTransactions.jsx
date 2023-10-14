import { useState, useEffect } from "react";
import axios from "axios";

export const useGetTransactions = () => {
    const [isFetchingTranx, setIsFetchingTranx] = useState(true)
    const [tranxData, setTranxData] = useState([]);
    const [getTranxError, setGetTranxError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/asset/getAllPurchase/0x780B021bc49E53a475b9Bf2b0D8817008BfE0468")
                setTranxData(response.data.purchaseList);
        
            } catch (error) {
                console.error("Get Transactions Error:", error)
                setGetTranxError(error.response.data?.detail)
            }
    
            setIsFetchingTranx(false);
        }
    
        fetchTransactions();
    }, [])
    
    return { tranxData, getTranxError, isFetchingTranx }
}