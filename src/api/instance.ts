import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default instance;
