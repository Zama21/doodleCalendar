import React from 'react';
import cls from './FormButton.module.css';
import classNames from 'classnames';

export const FormButton = props => {
    return <button {...props} className={classNames(cls.button, props.className)} />;
};
