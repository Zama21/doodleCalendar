import React, { useEffect, useState } from 'react';
import cls from './GlobalHeader.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { guestNavLinks, privateNavLinks } from './navLinks.js';
import { useAuth } from 'modules/auth/domain/hooks/useAuth.js';
import { useDispatch } from 'react-redux';
import { thunkLogout } from 'modules/auth/domain/thunks/logout.js';
import useScrollDirection from 'shared/hooks/useScrollDirection';
import imgLogo from '../../../../../shared/img/logo.png';
import SideMenu from './components/SideMenu/SideMenu';

export const GlobalHeader = ({ show }) => {
    const scrollDirection = useScrollDirection();
    const { isAuthed } = useAuth();
    const dispatch = useDispatch();
    const [navLinks, setNavLinks] = useState(guestNavLinks);
    const [isOpenSideMenu, setIsOpenSideMenu] = useState(0);

    useEffect(() => {
        setNavLinks(isAuthed ? privateNavLinks : guestNavLinks);
    }, [isAuthed]);

    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(thunkLogout());
        navigate('/auth/login');
    };
    return (
        <>
            <header
                className={`${cls.header} ${scrollDirection ? cls.hide : ''}`}
            >
                <div className={cls.pageFrame}>
                    <div
                        className={cls.wrapperLogo}
                        onClick={() => navigate('/')}
                    >
                        <img src={imgLogo} alt='logo' />
                        <span className={cls.nameSite}>Doodle Calendar</span>
                    </div>
                    <div className={cls.wrapperNavBar}>
                        <nav>
                            <ul className={cls.menu}>
                                {navLinks.map((link, index) => (
                                    <li key={link.to + link.title + index}>
                                        <Link to={link.to}>{link.title}</Link>
                                    </li>
                                ))}
                                {/* {isAuthed && (
                                <li>
                                    <button onClick={handleLogout}>Выход</button>
                                </li>
                            )} */}
                            </ul>
                        </nav>
                        <div
                            className={cls.wrapperImgUser}
                            onClick={() => setIsOpenSideMenu(1)}
                        >
                            <img
                                className={cls.imgUser}
                                src='https://cs13.pikabu.ru/avatars/1873/x1873132-1972677953.png'
                                alt='imgUser'
                            />
                        </div>
                    </div>
                </div>
            </header>
            <SideMenu
                isOpen={isOpenSideMenu}
                closeSideMenu={setIsOpenSideMenu}
            />
        </>
    );
};
