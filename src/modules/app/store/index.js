import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authReducer } from '../../auth/store/slices/authSlice.js';
import { modalsReducer } from 'modules/modals/store/modalsSlice.js';
import { sharedApi } from 'shared/api/sharedApi.js';

export const store = configureStore({
    reducer: combineReducers({
        auth: authReducer,
        modals: modalsReducer,
        [sharedApi.reducerPath]: sharedApi.reducer,
    }),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(sharedApi.middleware),
});
