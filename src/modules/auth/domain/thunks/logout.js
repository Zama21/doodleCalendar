import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../../../shared/api/apiInstance.js';
import { removeAuthToken } from '../lib/authToken.js';

export const thunkLogout = createAsyncThunk('auth/logout', async (loginData, thunkApi) => {
    try {
        removeAuthToken();
        axiosInstance.defaults.headers['Authorization'] = '';
    } catch (err) {
        console.log(err);
    }
});
