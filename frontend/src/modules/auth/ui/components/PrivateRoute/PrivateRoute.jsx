import React from 'react';
import { useAuth } from '../../../domain/hooks/useAuth.js';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { NotAllowed } from '../../pages/NotAllowed/NotAllowed.jsx';

export const PrivateRoute = props => {
    const { roles: availableRoles = [] } = props;
    const { isAuthed, roles: userRoles } = useAuth();
    const location = useLocation();

    if (!isAuthed) return <Navigate to={`/auth/login?redirect=${location.pathname}`} />;
    if (!userRoles.some(role => availableRoles.includes(role))) return <NotAllowed />;
    return <Outlet />;
};
