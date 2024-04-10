import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { Role } from '../../../../auth/store/slices/authSlice.js';
import { PrivateRoute } from '../../../../auth/ui/components/PrivateRoute/PrivateRoute.jsx';
import { LoginPage } from '../../../../auth/ui/pages/LoginPage/LoginPage.jsx';
import HomePage from 'modules/home/ui/pages/HomePage/HomePage.jsx';

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/'>
                {/* all users */}
                <Route path='/'>
                    <Route path='/' element={<HomePage />} />

                    <Route path='auth'>
                        <Route path='login' element={<LoginPage />} />
                    </Route>
                </Route>

                {/* authed users */}
                <Route path='/' element={<PrivateRoute roles={[Role.User]} />}>
                    <Route path='home' element={<HomePage />} />
                </Route>

                {/* authed and admins */}
                <Route
                    path='/'
                    element={<PrivateRoute roles={[Role.Admin]} />}
                ></Route>

                {/* not existing page */}
                <Route path='*' element={<Navigate to={'/'} />} />
            </Route>
        </Routes>
    );
};
