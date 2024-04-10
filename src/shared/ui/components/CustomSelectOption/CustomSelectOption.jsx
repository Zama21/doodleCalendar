import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import cls from './CustomSelectOption.module.css';

export default function CustomSelectOption({
    options,
    onChange,
    label,
    defaultValue,
    IsClearSelection,
    clearSelectionText,
    clearOptionClassName,
    containerClassName,
    labelClassName,
    HeaderClassName,
    toggleArrowClassName,
    optionsListClassName,
    optionClassName,

    ...props
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(defaultValue ?? 'Выберете значение');
    useEffect(() => {
        setSelectedOption(defaultValue);
    }, [defaultValue]);

    const handleOptionClick = option => {
        setSelectedOption(option);
        onChange(option);

        setIsOpen(false);
    };
    const clearSelection = () => {
        setSelectedOption(defaultValue ?? 'Выберете значение');
        onChange('');
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
            {label && <span className={classNames(cls.label, labelClassName)}>{label}</span>}
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
                        <li
                            className={classNames(cls.option, {
                                [cls.active]: option == selectedOption,
                            })}
                            key={index}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
