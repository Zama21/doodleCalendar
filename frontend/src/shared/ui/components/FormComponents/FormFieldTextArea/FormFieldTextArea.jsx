import React from 'react';
import cls from './FormFieldTextArea.module.css';
import classNames from 'classnames';
import { useField } from 'formik';

export const FormFieldTextArea = ({
    label,
    containerClassName,
    fieldClassName,
    labelClassName,
    textareaClassName,
    errorClassName,
    ...props
}) => {
    const [field, meta] = useField(props);
    return (
        <label className={classNames(cls.container, containerClassName)}>
            <div className={classNames(cls.field, fieldClassName)}>
                <span className={classNames(cls.label, labelClassName)}>
                    {label}
                </span>
                <textarea
                    className={classNames(cls.textarea, textareaClassName)}
                    {...field}
                    {...props}
                />
            </div>
            {meta.touched && meta.error ? (
                <div className={classNames(cls.error, errorClassName)}>
                    {meta.error}
                </div>
            ) : null}
        </label>
    );
};
