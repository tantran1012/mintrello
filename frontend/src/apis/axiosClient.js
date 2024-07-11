import axios from 'axios'
import { getEnv } from '~/utils'
// import { apiConfig } from '~/configs/apiConfig';
// import { getToken } from '~/helper';
// import { handleUnAuthentication } from '~/helper/authentication';

const axiosClient = axios.create({
  baseURL: getEnv('VITE_API_ROOT'),
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})

axiosClient.interceptors.request.use(
  (config) => {
    // const token = getToken();
    // config.headers['Authorization'] = token ? `Bearer ${getToken()}` : '';
    return config
  },
  (error) => {
    throw error
  }
)

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response?.status == 401) {
    //   handleUnAuthentication();
    // }
    throw error
  }
)

export default axiosClient
