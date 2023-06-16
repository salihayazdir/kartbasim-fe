import axios from 'axios';
import Cookies from 'js-cookie';

const accessTokenBearer = Cookies.get('Authorization');
const refreshToken = Cookies.get('refresh');

const baseUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : undefined;

axios.defaults.withCredentials = true;

export const axiosPublic = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export const axiosProtected = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    Authorization: accessTokenBearer,
    refresh: refreshToken,
  },
});

export const axiosPublicServerSide = axios.create({
  baseURL: baseUrl,
});

export const axiosProtectedServerSide = axios.create({
  baseURL: baseUrl,
});

axiosProtected.interceptors.request.use((req) => {
  console.log(`url: "${req.url}"`);
  return req;
});

axiosProtected.interceptors.response.use(
  async (res) => res,
  async (error) => {
    if (error?.response?.status === 401) {
      await axiosPublic.get('/api/auth/refresh').catch((refreshError) => {
        return Promise.reject(refreshError);
      });
      return axios(error.config);
    }
    return Promise.reject(error);
  }
);
