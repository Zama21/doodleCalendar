import React from 'react';
import cls from './DayOfWeek.module.css';
import classNames from 'classnames';
import Range from './ui/Range/Range';

const DaysOfTheWeekLabels = [
    { id: 0, label: 'Понедельник' },
    { id: 1, label: 'Вторник' },
    { id: 2, label: 'Среда' },
    { id: 3, label: 'Четверг' },
    { id: 4, label: 'Пятница' },
    { id: 5, label: 'Суббота' },
    { id: 6, label: 'Воскресенье' },
];

export default function DayOfWeek({
    ranges,
    isLeft,
    dayOfWeekId,
    removeRangeIntervalById,
    setBusyRangesInterval,
}) {
    return (
        <div
            className={classNames(
                cls.wrapperDay,
                { [cls.left]: isLeft },
                { [cls.right]: !isLeft }
            )}
        >
            <div className={cls.day}>{`${
                DaysOfTheWeekLabels.find(item => item.id === dayOfWeekId).label
            }`}</div>
            <div className={cls.timeList}>
                <ul>
                    {ranges.map((range, ind) => {
                        return (
                            <Range
                                range={range}
                                key={ind}
                                removeRangeIntervalById={
                                    removeRangeIntervalById
                                }
                                setBusyRangesInterval={setBusyRangesInterval}
                            />
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
