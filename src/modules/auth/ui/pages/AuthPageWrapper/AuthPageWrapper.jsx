import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const AuthPageWrapper = ({ children }) => {
    const isAuthed = useSelector(state => state.auth.isAuthed);
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const redirect = searchParams.get('redirect');

    if (isAuthed) return <Navigate to={redirect ? redirect : '/'} />;
    return <>{children}</>;
};
