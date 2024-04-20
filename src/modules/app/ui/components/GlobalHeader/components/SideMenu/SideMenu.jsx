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
                    <NavLink to='/profile'>Профиль</NavLink>
                </li>
                <li>
                    <NavLink to='/events'>Мероприятия</NavLink>
                </li>
                <li>
                    <NavLink to='/calendar'>Календарь</NavLink>
                </li>
                <li>
                    <NavLink to='/rooms'>Кабинеты</NavLink>
                </li>
                <li>
                    <NavLink to='/logout'>Выход</NavLink>
                </li>
            </ul>
        </div>
    );
}
