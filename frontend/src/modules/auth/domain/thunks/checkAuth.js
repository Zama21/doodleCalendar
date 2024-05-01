import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../../../shared/api/apiInstance.js';

export const thunkCheckAuth = createAsyncThunk(
    'auth/check',
    async (_, thunkApi) => {
        try {
            const res = await axiosInstance.get('/auth/me');
            return res.data;
        } catch (err) {
            return thunkApi.rejectWithValue('Не авторизован');
        }
    }
);
