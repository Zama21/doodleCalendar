import React, { useEffect, useRef, useState } from 'react';
import cls from './DayOfWeek.module.css';
import classNames from 'classnames';
import Range from './ui/Range/Range';
import { CSSTransition } from 'react-transition-group';

const DaysOfTheWeekLabels = [
    { id: 0, label: 'Понедельник' },
    { id: 1, label: 'Вторник' },
    { id: 2, label: 'Среда' },
    { id: 3, label: 'Четверг' },
    { id: 4, label: 'Пятница' },
    { id: 5, label: 'Суббота' },
    { id: 6, label: 'Воскресенье' },
];

export default function DayOfWeek({ ranges, isLeft, dayOfWeekId }) {
    const [IsShow, setIsShow] = useState(true);
    const [countRanges, setCountRanges] = useState(ranges.length);
    const [valueHeight, setValueHeight] = useState('auto');
    const wrapperRef = useRef(null);

    useEffect(() => {
        setCountRanges(ranges.length);
    }, [ranges]);

    useEffect(() => {
        if (wrapperRef.current) {
            setValueHeight(`${wrapperRef.current.clientHeight}px`);
            if (countRanges < 1) setIsShow(false);
            else {
                setValueHeight(`auto`);
            }
        }
    }, [ranges, countRanges]);

    return (
        <CSSTransition
            in={IsShow}
            timeout={450}
            classNames='fade'
            unmountOnExit
        >
            <div
                className={classNames(
                    cls.wrapperDay,
                    { [cls.left]: isLeft },
                    { [cls.right]: !isLeft }
                )}
                style={{ height: valueHeight }}
                ref={wrapperRef}
            >
                <div className={cls.day}>{`${
                    DaysOfTheWeekLabels.find(item => item.id === dayOfWeekId)
                        .label
                }`}</div>

                <ul>
                    {ranges.map(range => {
                        return (
                            <Range
                                range={range}
                                key={range.id}
                                setCountRanges={setCountRanges}
                            />
                        );
                    })}
                </ul>
            </div>
        </CSSTransition>
    );
}
