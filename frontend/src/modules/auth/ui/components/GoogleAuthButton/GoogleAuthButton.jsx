import React from 'react';
import cls from './GoogleAuthButton.module.css';
import googleLogoImg from './assets/google.png';

const GoogleAuthButton = props => {
    return (
        <div onClick={props.onClick} className={cls.authButton}>
            <div className={cls.googleLogo} style={{ backgroundImage: `url(${googleLogoImg})` }}></div>
            <p className={cls.text}>Войти через google</p>
        </div>
    );
};

export default GoogleAuthButton;
