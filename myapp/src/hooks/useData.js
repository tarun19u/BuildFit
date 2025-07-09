import { useEffect, useState } from 'react';
import axios from 'axios';

const useStocks = (page = 1, limit = 10) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStocks = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.freeapi.app/api/v1/public/stocks', {
          params: { page, limit }
        });

        setData(response.data.data); 
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, [page, limit]);

  return { data, loading, error };
};

export default useStocks;
