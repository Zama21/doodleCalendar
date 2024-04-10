import axios from 'axios';
import { getAuthToken } from '../../modules/auth/domain/lib/authToken.js';

const { VITE_APP_SERVER_HOST, VITE_APP_SERVER_PORT } = import.meta.env;

export const axiosInstance = axios.create({
    baseURL: `${VITE_APP_SERVER_HOST}:${VITE_APP_SERVER_PORT}`,
    headers: {
        Authorization: `Bearer ${getAuthToken()}`,
    },
});
