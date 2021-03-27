import axios from 'axios';
import { apiUrl } from '../shared/envVars';
import localStorageService from '../shared/localStorageService';

const Axios = axios.create({
  baseURL: apiUrl,
});

Axios.interceptors.request.use(
  (config) => {
    const token = localStorageService.getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default Axios;
