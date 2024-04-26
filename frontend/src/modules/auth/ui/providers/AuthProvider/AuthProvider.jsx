import React, { Children, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkCheckAuth } from '../../../domain/thunks/checkAuth.js';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { axiosInstance } from 'shared/api/apiInstance.js';
import { setAuthToken } from 'modules/auth/domain/lib/authToken.js';

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const authIsLoading = useSelector(state => state.auth.authIsLoading);

    const searchParams = new URLSearchParams(location.search);
    const jwtToken = searchParams.get('jwtToken');

    useEffect(() => {
        if (jwtToken) {
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${jwtToken}`;
            setAuthToken(jwtToken);
        }
        dispatch(thunkCheckAuth());
    }, [jwtToken]);

    return <>{authIsLoading ? '' : children}</>;
};
