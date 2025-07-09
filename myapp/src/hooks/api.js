// hooks/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.freeapi.app/api/v1/public/stocks',
});

export const getStocks = (page = 1, limit = 10) => {
  return api.get('/', { params: { page, limit } });
};
