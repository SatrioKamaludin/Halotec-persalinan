// api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Replace this with your backend API URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export default axiosInstance;
