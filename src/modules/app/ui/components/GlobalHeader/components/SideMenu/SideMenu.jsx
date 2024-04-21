import React, { useEffect } from 'react';
import cls from './SideMenu.module.css';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export default function SideMenu({ isOpen, closeSideMenu }) {
    useEffect(() => {
        const handleClickOutside = event => {
            if (
                isOpen == 2 &&
                !event.target.closest(`.${cls.wrapperSideMenu}`)
            ) {
                closeSideMenu(0);
            }
            if (isOpen == 1) closeSideMenu(2);
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div
            className={classNames(cls.wrapperSideMenu, {
                [cls.isOpen]: isOpen == 2,
            })}
        >
            <span
                className={cls.RightArrow}
                onClick={() => closeSideMenu(0)}
            >{`→`}</span>
            <ul>
                <li>
                    <NavLink to='/profile' onClick={() => closeSideMenu(0)}>
                        Профиль
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/events' onClick={() => closeSideMenu(0)}>
                        Мероприятия
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/calendar' onClick={() => closeSideMenu(0)}>
                        Календарь
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/rooms' onClick={() => closeSideMenu(0)}>
                        Кабинеты
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/logout' onClick={() => closeSideMenu(0)}>
                        Выход
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}
