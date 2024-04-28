import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import cls from './Day.module.css';
import { useDispatch } from 'react-redux';
import { profileActions } from 'modules/pages/ProfilePage/store/profilePageSlice';
import BusyRange from './ui/BusyRange';
import { CSSTransition } from 'react-transition-group';

export default function Day({ isLeft, day, id, monthId, ranges, isAllBusy }) {
    const dispatch = useDispatch();
    const [valueHeight, setValueHeight] = useState(0);
    const [countRanges, setCountRanges] = useState(ranges.length);
    const [IsShow, setIsShow] = useState(true);
    const wrapperRef = useRef(null);
    const arrMonth = [
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декабря',
    ];

    function removeById(id) {
        dispatch(profileActions.removeRangeById(id));
    }
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
                <div className={cls.day}>{`${day} ${arrMonth[monthId]}`}</div>

                <ul>
                    {ranges.map((range, ind) => (
                        <BusyRange
                            key={range.id}
                            range={range}
                            setCountRanges={setCountRanges}
                            isAllBusy={isAllBusy}
                        />
                    ))}
                </ul>
            </div>
        </CSSTransition>
    );
}
