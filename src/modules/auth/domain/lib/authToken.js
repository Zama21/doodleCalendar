import { AUTH_TOKEN_KEY } from '../constants.js';

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY);
export const setAuthToken = value => localStorage.setItem(AUTH_TOKEN_KEY, value);
export const removeAuthToken = () => localStorage.removeItem(AUTH_TOKEN_KEY);
