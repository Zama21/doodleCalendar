import React, { useState } from 'react';
import DayOfWeek from './ui/DayOfWeek/DayOfWeek';
import cls from './BusyRangeListInterval.module.css';

export default function BusyRangeListInterval({
    busyRangesInterval,
    removeRangeIntervalById,
    setBusyRangesInterval,
}) {
    let isLeft = true;
    return (
        <div className={cls.wrapper}>
            {Array.from({ length: 7 }, (_, indexDay) => {
                const ranges = busyRangesInterval.filter(
                    item => item.dayId == indexDay
                );
                if (!ranges.length > 0) return;
                isLeft = !isLeft;
                return (
                    <DayOfWeek
                        ranges={ranges}
                        isLeft={isLeft}
                        dayOfWeekId={indexDay}
                        removeRangeIntervalById={removeRangeIntervalById}
                        setBusyRangesInterval={setBusyRangesInterval}
                    />
                );
            })}
        </div>
    );
}
