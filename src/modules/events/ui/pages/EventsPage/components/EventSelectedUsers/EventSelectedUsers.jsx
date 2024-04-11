import React, { useContext } from 'react';
import cls from './EventSelectedUsers.module.css';
import { EventsContext } from '../../EventsContext';
import classNames from 'classnames';
import UserItem from '../EventDetails/components/UserSearchResults/components/UserItem/UserItem';

export default function EventSelectedUsers() {
    const {
        showSelectedUser,
        getAllUsers,
        savedSelectedUsers,
        unsavedSelectedUsers,
    } = useContext(EventsContext);

    return (
        <div
            className={classNames(
                cls.wrapperSelectedUsers,
                {
                    [cls.open]: showSelectedUser == 2 || showSelectedUser == 1,
                },
                { [cls.close]: showSelectedUser == 3 }
            )}
        >
            {(showSelectedUser == 1 ||
                showSelectedUser == 2 ||
                showSelectedUser == 3) && (
                <>
                    <div className={cls.headerSelectedUsers}>
                        <h2>Добавленные участники</h2>
                    </div>
                    <div className={cls.contentSelectedUsers}>
                        <div className={cls.selectedUsers}>
                            <ul>
                                {unsavedSelectedUsers.map((user, index) => (
                                    <UserItem
                                        key={user.id}
                                        user={user}
                                        isCheckedDefault={true}
                                    />
                                ))}
                                {/* {savedSelectedUsers.map((user, index) => (
                                    <UserItem
                                        key={user.id}
                                        user={user}
                                        isCheckedDefault={true}
                                    />
                                ))} */}
                            </ul>
                        </div>
                        <div className={cls.busySelectedUsers}>
                            <h3>В это время заняты</h3>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
