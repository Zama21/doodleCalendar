import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { Role } from '../../../../auth/store/slices/authSlice.js';
import { PrivateRoute } from '../../../../auth/ui/components/PrivateRoute/PrivateRoute.jsx';
import { LoginPage } from '../../../../auth/ui/pages/LoginPage/LoginPage.jsx';
import EventsPage from 'modules/events/ui/pages/EventsPage/EventsPage.jsx';
import CalendarPage from 'modules/pages/CalendarPage/CalendarPage.jsx';
import RoomsPage from 'modules/pages/RoomsPage/RoomsPage.jsx';

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/'>
                {/* all users */}
                <Route path='/'>
                    <Route path='/' element={<EventsPage />} />

                    <Route path='auth'>
                        <Route path='login' element={<LoginPage />} />
                    </Route>
                </Route>

                {/* authed users */}
                <Route path='/' element={<PrivateRoute roles={[Role.User]} />}>
                    <Route path='events' element={<EventsPage />} />
                    <Route path='calendar' element={<CalendarPage />} />
                    <Route path='rooms' element={<RoomsPage />} />
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
