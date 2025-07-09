import { useState } from "react";
import useStocks from "../hooks/useData";

import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";

const StockData = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, loading, error } = useStocks(page, limit);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Stock Data
      </Typography>

      {data?.data?.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {data.data.map((stock) => (
              <Grid item xs={12} sm={6} md={4} key={stock._id}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h6">{stock.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Symbol: {stock.symbol}
                    </Typography>
                    <Typography variant="body1">
                      Price: ${stock.price || "N/A"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box display="flex" justifyContent="center" alignItems="center" mt={4} gap={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Typography variant="body1">Page {page}</Typography>
            <Button variant="contained" onClick={() => setPage((p) => p + 1)}>
              Next
            </Button>
          </Box>
        </>
      ) : (
        <Typography align="center" mt={4}>
          No stock data available.
        </Typography>
      )}
    </Container>
  );
};

export default StockData;
