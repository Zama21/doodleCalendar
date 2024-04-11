import { EventsPageApi } from 'modules/events/api/EventsPageApi/EventsPageApi';
import React, { createContext, useState } from 'react';

export const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
    const [savedSelectedUsers, setSavedSelectedUsers] = useState([]);
    const [unsavedSelectedUsers, setUnsavedSelectedUsers] = useState([]);
    const [busyUsers, setBusyUsers] = useState([]);
    const [showSelectedUser, setShowSelectedUser] = useState(0);
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const handleUserSelection = user => {};

    const handleUserBusy = user => {};

    const getAllUsers = () => {
        if (allUsers.length == 0)
            EventsPageApi.getAllUsers().then(res => {
                setAllUsers(res);
                return res;
            });
        return allUsers;
    };

    return (
        <EventsContext.Provider
            value={{
                savedSelectedUsers,
                setSavedSelectedUsers,
                unsavedSelectedUsers,
                setUnsavedSelectedUsers,
                busyUsers,
                setBusyUsers,
                showSelectedUser,
                setShowSelectedUser,
                handleUserSelection,
                handleUserBusy,
                getAllUsers,
                filteredUsers,
                setFilteredUsers,
            }}
        >
            {children}
        </EventsContext.Provider>
    );
};

export default EventsProvider;
