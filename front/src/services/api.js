import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.22.239.67:3333',
});

export default api;
