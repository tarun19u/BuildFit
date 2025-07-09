// hooks/useStocks.js
import { useState, useEffect } from 'react';
import { getStocks } from './api'; // ✅ this is the only import you need

export default function useStocks(page = 1, limit = 10) {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 0,
    totalItems: 0,
    nextPage: false,
    previousPage: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getStocks(page, limit);
        const result = response.data.data; // your JSON format

        setStocks(result.data); // this is your array of stock objects
        setPagination({
          page: result.page,
          limit: result.limit,
          totalPages: result.totalPages,
          totalItems: result.totalItems,
          nextPage: result.nextPage,
          previousPage: result.previousPage,
        });
      } catch (err) {
        setError(err.message || 'Failed to load stocks');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit]);

  return { stocks, loading, error, pagination };
}
