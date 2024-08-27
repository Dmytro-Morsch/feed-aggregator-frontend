import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use(
  function (config) {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  function (error) {
    console.log('Error');
    return Promise.reject(error);
  }
);

export default instance;
