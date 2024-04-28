import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import cls from './BusyRange.module.css';
import { CSSTransition } from 'react-transition-group';
import { profileActions } from 'modules/pages/ProfilePage/store/profilePageSlice';

function getTimeFromDate(dateString) {
    const time = dateString.split('T')[1];
    return time;
}

export default function BusyRange({ range, setCountRanges, isAllBusy }) {
    const dispatch = useDispatch();
    const [IsShow, setIsShow] = useState(true);

    function removeById(id) {
        dispatch(profileActions.removeRangeById(id));
    }
    return (
        <CSSTransition
            in={IsShow}
            timeout={450}
            classNames='fade'
            unmountOnExit
        >
            <li className={cls.range}>
                {!isAllBusy && (
                    <div>
                        {`${getTimeFromDate(
                            range.startDate
                        )} - ${getTimeFromDate(range.endDate)}`}
                    </div>
                )}
                {isAllBusy && <div>Занят весь день</div>}
                <div
                    className={cls.deleteRange}
                    onClick={() => {
                        setIsShow(false);
                        setCountRanges(prev => prev - 1);
                        setTimeout(() => {
                            removeById(range.id);
                        }, 450);
                    }}
                >
                    x
                </div>
            </li>
        </CSSTransition>
    );
}
