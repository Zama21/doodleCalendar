import { createSlice } from '@reduxjs/toolkit';
import { thunkCheckAuth } from '../../domain/thunks/checkAuth.js';
import { thunkLogin } from '../../domain/thunks/login.js';
import { thunkRegister } from '../../domain/thunks/register.js';
import { thunkLogout } from 'modules/auth/domain/thunks/logout.js';

export const Role = {
    User: 'user',
    Admin: 'admin',
};

export const AllRoles = Object.values(Role);

export const authSlice = createSlice({
    name: 'user',
    initialState: {
        userData: null,
        isAuthed: false,
        authIsLoading: true,
        registration: {
            error: '',
            success: false,
        },
        login: {
            error: '',
        },
    },
    reducers: {
        setRegistrationData(state, action) {
            state.registration = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(thunkCheckAuth.fulfilled, (state, action) => {
            state.authIsLoading = false;
            state.isAuthed = true;

            state.userData = {
                email: action.payload.email,
                username: action.payload.username,
                id: action.payload.id,
                roles: action.payload.roles,
            };
        });
        builder.addCase(thunkCheckAuth.rejected, (state, action) => {
            state.isAuthed = false;
            state.authIsLoading = false;
        });
        builder.addCase(thunkCheckAuth.pending, (state, action) => {
            state.authIsLoading = true;
        });
        builder.addCase(thunkLogin.fulfilled, (state, action) => {
            state.isAuthed = true;
            state.userData = action.payload;
        });
        builder.addCase(thunkLogin.rejected, (state, action) => {
            state.isAuthed = false;
            state.login.error = action.payload;
        });
        builder.addCase(thunkLogin.pending, (state, action) => {
            state.login.error = '';
        });
        builder.addCase(thunkRegister.fulfilled, (state, action) => {
            state.registration.success = true;
        });
        builder.addCase(thunkRegister.rejected, (state, action) => {
            state.registration.error = action.payload;
        });
        builder.addCase(thunkRegister.pending, (state, action) => {
            state.registration.error = '';
            state.registration.success = false;
        });
        builder.addCase(thunkLogout.fulfilled, (state, action) => {
            state.isAuthed = false;
            state.userData = null;
        });
    },
});

export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;
