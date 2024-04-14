import React, { useContext, useEffect, useState } from 'react';
import cls from './UserItem.module.css';
import classNames from 'classnames';
import { EventsContext } from 'modules/events/ui/pages/EventsPage/EventsContext';

export default function UserItem({ user }) {
    const { id, name, surname, patronymic, isCheckedDefault = false } = user;
    // const [isChecked, setIsChecked] = useState(isCheckedDefault);
    const { setUnsavedSelectedUsers, setFilteredUsers } =
        useContext(EventsContext);

    // console.log(name, isCheckedDefault);

    const handleUserClick = () => {
        setUnsavedSelectedUsers(prev => {
            if (isCheckedDefault) {
                setFilteredUsers(prev => {
                    return prev.map((item, index) => {
                        if (item.id == id) {
                            return { ...item, isCheckedDefault: false };
                        } else return item;
                    });
                });
                return [...prev.filter(item => item.id != id)];
            } else {
                setFilteredUsers(prev => {
                    return prev.map((item, index) => {
                        if (item.id == id) {
                            return { ...item, isCheckedDefault: true };
                        } else return item;
                    });
                });
                return [{ ...user, isCheckedDefault: true }, ...prev];
            }
        });
    };
    return (
        <li className={cls.userItem} onClick={handleUserClick}>
            <div className={cls.wrapperFio}>
                {surname} {name} {patronymic}
            </div>

            <div
                className={classNames(cls.circle, {
                    [cls.checked]: isCheckedDefault,
                })}
            >
                <div className={cls.tickMark}></div>
            </div>
        </li>
    );
}
