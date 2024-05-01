import React from 'react';
import cls from './Button.module.css';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

export const ButtonTheme = {
    primary: 'primary',
    secondary: 'secondary',
};

export const Button = ({
    className,
    linkTo,
    imgSrc,
    theme = ButtonTheme.primary,
    children,
    ...buttonProps
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (linkTo) {
            navigate(linkTo);
        } else {
            buttonProps.onClick?.();
        }
    };

    return (
        <button
            {...buttonProps}
            className={classNames(cls.button, cls[theme], className, {
                [cls.withImg]: Boolean(imgSrc),
            })}
            onClick={handleClick}
        >
            {imgSrc && <img src={imgSrc} style={{ width: '20px' }} alt='img' />}
            {children}
        </button>
    );
};
