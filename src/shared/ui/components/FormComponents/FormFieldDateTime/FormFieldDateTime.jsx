import { useField } from 'formik';
import React from 'react';
import cls from './FormFieldDateTime.module.css';
import classNames from 'classnames';

export const FormFieldDateTime = ({
    label,
    containerClassName,
    fieldClassName,
    labelClassName,
    inputClassName,
    errorClassName,
    IsShowError = true,
    type = 'datetime-local',
    ...props
}) => {
    const [field, meta, helpers] = useField(props);

    const handleDateChange = e => {
        helpers.setValue(e.target.value);
    };
    return (
        <div className={classNames(cls.container, containerClassName)}>
            <div className={classNames(cls.field, fieldClassName)}>
                <span className={classNames(cls.label, labelClassName)}>
                    {label}
                </span>
                <div className={cls.wrapperDateTime}>
                    <input
                        type={type}
                        value={field.value}
                        onChange={handleDateChange}
                    />
                </div>
            </div>
            {meta.touched && meta.error && IsShowError ? (
                <div className={classNames(cls.error, errorClassName)}>
                    {meta.error}
                </div>
            ) : null}
        </div>
    );
};
