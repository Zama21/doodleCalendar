import React from 'react';
import { Link } from 'react-router-dom';
import cls from './FormLink.module.css';
import classNames from 'classnames';

export const FormLink = ({ to, text, ...props }) => {
    return (
        <Link to={to} className={classNames(cls.link, props.className)}>
            {text}
        </Link>
    );
};
