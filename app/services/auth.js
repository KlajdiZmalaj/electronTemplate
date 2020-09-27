import axios from 'axios';

const apiUrl = `test.192`;
const api = {
  baseUrl: apiUrl,
  headers: {},
};

const request = axios.create({
  baseURL: api.baseUrl,
  headers: api.headers,
});

export const fetchData = (p1, p2) =>
  request.post(`/backend/api/=${p1}&dd=${p2}`).catch((error) => ({ error }));
