import React, { useState } from 'react';
import DayOfWeek from './ui/DayOfWeek/DayOfWeek';
import cls from './BusyRangeListInterval.module.css';
import { CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';

export default function BusyRangeListInterval() {
    const { busyRangesInterval } = useSelector(state => state.profile);
    let isLeft = true;
    return (
        <div className={cls.wrapper}>
            {Array.from({ length: 7 }, (_, indexDay) => {
                const ranges = busyRangesInterval.filter(
                    item => item.dayId == indexDay
                );
                if (ranges.length === 0) return;
                isLeft = !isLeft;
                return (
                    <CSSTransition
                        key={indexDay}
                        in={true}
                        timeout={450}
                        classNames='fade'
                        unmountOnExit
                    >
                        <DayOfWeek
                            ranges={ranges}
                            isLeft={isLeft}
                            dayOfWeekId={indexDay}
                        />
                    </CSSTransition>
                );
            })}
            {busyRangesInterval.length < 1 && (
                <div className={cls.alertEmptyList}>Здесь пока пусто.</div>
            )}
        </div>
    );
}
