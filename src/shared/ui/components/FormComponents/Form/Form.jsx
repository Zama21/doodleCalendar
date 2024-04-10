import React from 'react';
import cls from './Form.module.css';
import classNames from 'classnames';

export const Form = props => {
    const { children, onSubmit } = props;
    return (
        <form onSubmit={onSubmit} className={classNames(cls.form, props.className)}>
            {children}
        </form>
    );
};
