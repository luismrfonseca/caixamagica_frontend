import axios from 'axios';

import { createBrowserHistory } from 'history'; // or createBrowserHistory
import BASE_URL from './BASE_URL';


const history = createBrowserHistory({
  basename: '/',
  forceRefresh: true,
});

const signal = axios.CancelToken.source();

const Instance = () => {
  const instance = axios.create({
    baseURL: `${BASE_URL}`,
    headers: { Authorization: localStorage.getItem('token') },
    cancelToken: signal.token,
  });

  // Add a request interceptor
  instance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error),
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      switch (error.response.status) {
        case 401:
          break;

        default:
          console.log('From Interceptor');
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

export default Instance;
