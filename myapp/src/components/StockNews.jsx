import { useParams } from 'react-router-dom';
import useNews from '../hooks/news';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Container
} from '@mui/material';

const headers = {
  'x-rapidapi-key': 'YOUR_API_KEY',
  'x-rapidapi-host': 'indian-stock-exchange-api2.p.rapidapi.com'
};

const StockNews = () => {
  const { symbol } = useParams();
  const { news, loading, error } = useNews(symbol, headers);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Corporate News for {symbol}
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && news.length === 0 && <Typography>No news available.</Typography>}

      <Grid container spacing={2}>
        {news.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.title || 'Corporate Action'}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.ex_date && `Ex-Date: ${item.ex_date}`}
                </Typography>
                <Typography variant="body2">
                  {item.purpose || 'No description available'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StockNews;
