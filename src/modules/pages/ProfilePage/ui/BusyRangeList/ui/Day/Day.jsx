import classNames from 'classnames';
import React from 'react';
import cls from './Day.module.css';

function getTimeFromDate(dateString) {
    const time = dateString.split('T')[1];
    return time;
}
export default function Day({
    isLeft,
    day,
    id,
    monthId,
    ranges,
    isAllBusy,
    removeRangeById,
}) {
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
    // console.log(ranges);
    return (
        <div
            className={classNames(
                cls.wrapperDay,
                { [cls.left]: isLeft },
                { [cls.right]: !isLeft }
            )}
        >
            <div className={cls.day}>{`${day} ${arrMonth[monthId]}`}</div>
            <div className={cls.timeList}>
                {!isAllBusy && (
                    <ul>
                        {ranges.map((range, ind) => {
                            return (
                                <li key={ind}>
                                    <div>
                                        {`${getTimeFromDate(
                                            range.startDate
                                        )} - ${getTimeFromDate(range.endDate)}`}
                                    </div>
                                    <div
                                        className={cls.deleteRange}
                                        onClick={() => {
                                            console.log(range);
                                            removeRangeById(range.id);
                                        }}
                                    >
                                        x
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
                {isAllBusy && (
                    <ul>
                        <li>
                            <div>Занят весь день</div>
                            <div
                                className={cls.deleteRange}
                                onClick={() => removeRangeById(id)}
                            >
                                x
                            </div>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
}
