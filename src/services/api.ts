import {AppError} from '../utils/AppError';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://hooks.zapier.com/hooks/catch/472009',
});

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.data) {
      return Promise.reject(new AppError(error.response.data.message));
    }
    return Promise.reject(error);
  },
);

export {api};
