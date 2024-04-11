import React, { useContext } from 'react';
import cls from './UserSearchResults.module.css';
import UserItem from './components/UserItem/UserItem';
import { EventsContext } from '../../../../EventsContext';

export default function UserSearchResults() {
    const { filteredUsers } = useContext(EventsContext);

    return (
        <div className={cls.wrapperSearchResults}>
            <ul>
                {filteredUsers.map((user, index) => (
                    <UserItem key={user.id} user={user} />
                ))}
            </ul>
        </div>
    );
}
