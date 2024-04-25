import React, { useEffect, useState } from 'react';
import cls from './Range.module.css';
import classNames from 'classnames';
import DaysOfWeek from 'shared/ui/components/DaysOfWeek/DaysOfWeek';
import { CSSTransition } from 'react-transition-group';

const initialDaysOfTheWeek = [
    { id: 0, label: 'Пн', isSelected: false },
    { id: 1, label: 'Вт', isSelected: false },
    { id: 2, label: 'Ср', isSelected: false },
    { id: 3, label: 'Чт', isSelected: false },
    { id: 4, label: 'Пт', isSelected: false },
    { id: 5, label: 'Сб', isSelected: false },
    { id: 6, label: 'Вс', isSelected: false },
];
function getSelectedIds(arr) {
    return arr.filter(item => item.isSelected).map(item => item.id);
}

export default function Range({
    range,
    removeRangeIntervalById,
    setBusyRangesInterval,
}) {
    const [isShowDayOfTheWeek, setIsShowDayOfTheWeek] = useState(false);
    const [daysOfTheWeek, setDaysOfTheWeek] = useState(initialDaysOfTheWeek);
    const [IsShow, setIsShow] = useState(true);
    //nsole.log(range);

    useEffect(() => {
        setDaysOfTheWeek(prev =>
            prev.map(item => {
                return {
                    ...item,
                    isSelected: range.dayId === item.id,
                };
            })
        );
    }, [range]);

    const handleDayClick = index => {
        setDaysOfTheWeek(prev => {
            const updatedDays = [...prev];
            updatedDays[index] = {
                ...updatedDays[index],
                isSelected: !updatedDays[index].isSelected,
            };
            return updatedDays;
        });
    };

    function saveSelectedDays() {
        removeRangeIntervalById(range.id);
        setBusyRangesInterval(prev => {
            return [
                ...prev,
                ...getSelectedIds(daysOfTheWeek).map(id => {
                    return {
                        startTime: range.startTime,
                        endTime: range.endTime,
                        dayId: id,
                    };
                }),
            ];
        });
    }
    return (
        // <CSSTransition
        //     in={IsShow}
        //     timeout={5000}
        //     classNames='fade'
        //     unmountOnExit
        // >
        <li>
            <div className={cls.header}>
                <div>{`${range.startTime} - ${range.endTime}`}</div>
                <div className={cls.wrapperControlBtn}>
                    <div
                        className={cls.deleteRange}
                        onClick={() => {
                            setIsShow(false);
                            removeRangeIntervalById(range.id);
                        }}
                    >
                        &#10006;
                    </div>
                    <div
                        className={cls.save}
                        onClick={() => saveSelectedDays()}
                    >
                        &#10003;
                    </div>

                    <div
                        className={classNames(cls.showDays, {
                            [cls.rotate]: isShowDayOfTheWeek,
                        })}
                        onClick={() => setIsShowDayOfTheWeek(prev => !prev)}
                    >
                        ▼
                    </div>
                </div>
            </div>

            <DaysOfWeek
                isShowDayOfTheWeek={isShowDayOfTheWeek}
                daysOfTheWeek={daysOfTheWeek}
                handleDayClick={handleDayClick}
                clsDay={cls.day}
                clsWrapperDays={cls.wrapperDays}
                clsShow={cls.clsShow}
            />
        </li>
        // </CSSTransition>
    );
}
