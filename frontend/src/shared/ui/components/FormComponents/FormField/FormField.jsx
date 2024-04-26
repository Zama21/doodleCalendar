import { useField } from 'formik';
import React from 'react';
import cls from './FormField.module.css';
import classNames from 'classnames';

export const FormField = ({
    label,
    containerClassName,
    fieldClassName,
    labelClassName,
    inputClassName,
    errorClassName,
    ...props
}) => {
    const [field, meta] = useField(props);
    return (
        <label className={classNames(cls.container, containerClassName)}>
            <div className={classNames(cls.field, fieldClassName)}>
                <span className={classNames(cls.label, labelClassName)}>{label}</span>
                <input
                    className={classNames(cls.input, inputClassName)}
                    {...field}
                    {...props}
                    value={props.type === 'number' ? Number(field.value).toString() : field.value}
                />
            </div>
            {meta.touched && meta.error ? (
                <div className={classNames(cls.error, errorClassName)}>{meta.error}</div>
            ) : null}
        </label>
    );
};
