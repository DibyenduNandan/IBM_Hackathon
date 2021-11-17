import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Connecting react application with mongodb through axios

const instance = axios.create({
  baseURL: 'https://lifestore-database.herokuapp.com/',
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
