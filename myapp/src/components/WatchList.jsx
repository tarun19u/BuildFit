import { useEffect, useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function WatchList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setList(saved);
  }, []);

  const remove = symbol => {
    const updated = list.filter(s => s !== symbol);
    setList(updated);
    localStorage.setItem('watchlist', JSON.stringify(updated));
  };

  if (!list.length) return <Typography mt={3}>No favorites yet.</Typography>;

  return (
    <Box mt={3}>
      <Typography variant="h5">My Watchlist</Typography>
      {list.map(symbol => (
        <Box key={symbol} display="flex" alignItems="center" mt={2} gap={2}>
          <Button component={Link} to={`/stock/${symbol}`}>{symbol}</Button>
          <Button variant="outlined" color="error" onClick={() => remove(symbol)}>Remove</Button>
        </Box>
      ))}
    </Box>
  );
}
