import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../../../shared/api/apiInstance.js';

export const thunkRegister = createAsyncThunk('user/reg', async (registerData, thunkApi) => {
    try {
        const res = await axiosInstance.post('/auth/reg', registerData);
        return res.data;
    } catch (err) {
        return thunkApi.rejectWithValue(err?.response.data.message);
    }
});
