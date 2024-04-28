import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authReducer } from '../../auth/store/slices/authSlice.js';
import { modalsReducer } from 'modules/modals/store/modalsSlice.js';
import { sharedApi } from 'shared/api/sharedApi.js';
import { profileReducer } from 'modules/pages/ProfilePage/store/profilePageSlice.js';

export const store = configureStore({
    reducer: combineReducers({
        auth: authReducer,
        modals: modalsReducer,
        profile: profileReducer,
        [sharedApi.reducerPath]: sharedApi.reducer,
    }),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(sharedApi.middleware),
});
