import React from 'react';
import cls from './FormError.module.css';
import classNames from 'classnames';

export const FormError = ({ message, ...props }) => {
    return (
        <div className={classNames(cls.error, props.className)}>
            <p className={cls.message}>{message}</p>
        </div>
    );
};
