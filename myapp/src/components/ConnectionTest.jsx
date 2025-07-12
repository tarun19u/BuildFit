import { useState } from 'react';
import { Box, Button, Typography, Alert, CircularProgress } from '@mui/material';
import axios from 'axios';

const ConnectionTest = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setResult(null);

    try {
      console.log('🧪 Testing frontend to backend connection...');

      const API_BASE_URL = 'https://buildfit.onrender.com/api';

      // Test the simple test endpoint
      const response = await axios.get(`${API_BASE_URL}/test`);
      
      console.log('✅ Connection successful:', response.data);
      setResult({
        success: true,
        message: 'Connection successful!',
        data: response.data
      });
      
    } catch (error) {
      console.error('❌ Connection failed:', error);
      setResult({
        success: false,
        message: 'Connection failed',
        error: error.message,
        details: error.response?.data || 'No response from server'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        🔧 Backend Connection Test
      </Typography>
      
      <Button 
        variant="contained" 
        onClick={testConnection}
        disabled={loading}
        sx={{ mb: 3 }}
      >
        {loading ? <CircularProgress size={20} sx={{ mr: 1 }} /> : '🧪'} 
        Test Connection
      </Button>
      
      {result && (
        <Alert 
          severity={result.success ? 'success' : 'error'}
          sx={{ mb: 2 }}
        >
          <Typography variant="h6">
            {result.success ? '✅ Success!' : '❌ Failed!'}
          </Typography>
          <Typography variant="body2">
            {result.message}
          </Typography>
          {result.error && (
            <Typography variant="body2" sx={{ mt: 1, fontFamily: 'monospace' }}>
              Error: {result.error}
            </Typography>
          )}
        </Alert>
      )}
      
      {result?.data && (
        <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
            {JSON.stringify(result.data, null, 2)}
          </Typography>
        </Box>
      )}
      
      <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
        This test checks if your frontend can connect to the backend server on localhost:5000.
        If it fails, check:
        <br />• Backend server is running (npm run server)
        <br />• No firewall blocking localhost:5000
        <br />• CORS configuration is correct
      </Typography>
    </Box>
  );
};

export default ConnectionTest;
