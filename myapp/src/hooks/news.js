import { useState, useEffect } from "react";

const useNews = (stockName) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://indian-stock-exchange-api2.p.rapidapi.com/corporate_actions?stock_name=${stockName}`,
                    {
                        method: "GET",
                        headers: {
                            "x-rapidapi-key": "7c05ca33famshf6ae634be698d0ep1c248cjsn908a5bb566e2",
                            "x-rapidapi-host": "indian-stock-exchange-api2.p.rapidapi.com"
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                setNews(data);
            } catch (err) {
                setError(err.message || "Failed to load news");
            } finally {
                setLoading(false);
            }
        };

        if (stockName) {
            fetchNews();
        }
    }, [stockName]); // re-run when stockName changes

    return { news, loading, error };
};

export default useNews;
