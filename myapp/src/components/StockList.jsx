import { useState } from 'react';
import useStocks from '../hooks/useStocks';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function StockList() {
  const [page, setPage] = useState(1);
  const { stocks, loading, error, pagination } = useStocks(page);
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Stock List (Page {pagination.page})</h2>
      {stocks.map((stock, idx) => (
        <div key={idx} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h3>{stock.Name} ({stock.Symbol})</h3>
          <p>Market Cap: {stock.MarketCap}</p>
          <p>Current Price: {stock.CurrentPrice}</p>
          <p>High/Low: {stock.HighLow}</p>
          <p>PE: {stock.StockPE}</p>
          <p>Book Value: {stock.BookValue}</p>
          <p>Dividend Yield: {stock.DividendYield}</p>
          <p>ROCE: {stock.ROCE}</p>
          <p>ROE: {stock.ROE}</p>
          <p>Face Value: {stock.FaceValue}</p>

          <Button
            variant="outlined"
            onClick={() => navigate(`/news/${stock.Name.toUpperCase()}`)}
            sx={{ mt: 1 }}
          >
            View News
          </Button>
        </div>
      ))}

      <div>
        <button disabled={!pagination.previousPage} onClick={() => setPage(p => p - 1)}>Previous</button>
        <span> Page {pagination.page} of {pagination.totalPages} </span>
        <button disabled={!pagination.nextPage} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}
