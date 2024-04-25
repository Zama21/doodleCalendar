import classNames from 'classnames';
import React from 'react';
import cls from './DaysOfWeek.module.css';

export default function DaysOfWeek({
    isShowDayOfTheWeek,
    daysOfTheWeek,
    handleDayClick,
    clsWrapperDays,
    clsDay,
    clsShow,
}) {
    return (
        <div
            className={classNames(cls.wrapperDaysOfWeek, clsWrapperDays, {
                [cls.show]: isShowDayOfTheWeek,
                [clsShow]: isShowDayOfTheWeek,
            })}
        >
            {daysOfTheWeek.map((item, index) => {
                return (
                    <div
                        key={index}
                        className={classNames(cls.day, clsDay, {
                            [cls.selected]: item.isSelected,
                        })}
                        onClick={() => handleDayClick(index)}
                    >
                        {item.label}
                    </div>
                );
            })}
        </div>
    );
}
