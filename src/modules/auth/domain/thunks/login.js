import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../../../shared/api/apiInstance.js';
import { setAuthToken } from '../lib/authToken.js';

export const thunkLogin = createAsyncThunk('auth/login', async (loginData, thunkApi) => {
    try {
        const res = await axiosInstance.post('/auth/login', loginData);
        const { authToken, userData } = res.data;
        setAuthToken(authToken);
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${authToken}`;
        return userData;
    } catch (err) {
        return thunkApi.rejectWithValue(err.response.data.message);
    }
});
