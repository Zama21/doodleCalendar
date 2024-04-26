import React, { useEffect, useState } from 'react';
import cls from './FormCustomSelectOption.module.css';
import classNames from 'classnames';
import { useField } from 'formik';

export default function FormCustomSelectOption({
    options,
    label,
    IsClearSelection,
    clearSelectionText,
    clearOptionClassName,
    containerClassName,
    labelClassName,
    HeaderClassName,
    toggleArrowClassName,
    optionsListClassName,
    optionClassName,
    errorClassName,
    ...props
}) {
    const [field, meta] = useField(props);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(field.value ?? 'Выберете значение');

    const handleOptionClick = option => {
        setSelectedOption(option);
        field.onChange({ target: { value: option, name: props.name } });
        setIsOpen(false);
    };
    const clearSelection = () => {
        setSelectedOption('Выберете значение');
        field.onChange({ target: { value: '', name: props.name } });
    };

    useEffect(() => {
        const handleBlur = () => setIsOpen(false);
        window.addEventListener('click', handleBlur);
        return () => {
            window.removeEventListener('click', handleBlur);
        };
    }, []);

    return (
        <div
            className={classNames(cls.container, containerClassName)}
            onClick={e => {
                e.stopPropagation();
                setIsOpen(!isOpen);
            }}
        >
            <span className={classNames(cls.label, labelClassName)}>{label}</span>
            <button className={cls.header} onClick={e => e.preventDefault()}>
                {selectedOption}
                <span
                    className={classNames(cls.toggleArrow, {
                        [cls.active]: isOpen,
                    })}
                >
                    ▼
                </span>
            </button>

            {isOpen && (
                <ul className={cls.optionsList}>
                    {IsClearSelection && (
                        <li
                            className={classNames(
                                cls.option,
                                cls.clearSelectionOption,
                                clearOptionClassName
                            )}
                            onClick={() => clearSelection()}
                        >
                            {clearSelectionText ?? 'Отменить выбор'}
                        </li>
                    )}
                    {options.map((option, index) => (
                        <li className={cls.option} key={index} onClick={() => handleOptionClick(option)}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
            {meta.touched && meta.error ? (
                <div className={classNames(cls.error, errorClassName)}>{meta.error}</div>
            ) : null}
        </div>
    );
}
