import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_V1_URL,
});

export const setAuthToken = (token) => {
  if (token) {
    //applying token
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    //deleting the token from header
    delete instance.defaults.headers.common['Authorization'];
  }
};

export default instance;
