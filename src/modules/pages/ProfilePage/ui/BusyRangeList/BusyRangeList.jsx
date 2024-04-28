import React, { useEffect, useState } from 'react';
import cls from './BusyRangeList.module.css';
import Day from './ui/Day/Day';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function isSameDay(date1, date2) {
    if (!(date1 && date2)) return false;
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}
function isFullDayRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const isStartMidnight = start.getHours() === 0 && start.getMinutes() === 0;
    const isEndBeforeMidnight =
        end.getHours() === 23 && end.getMinutes() === 59;

    return isStartMidnight && isEndBeforeMidnight;
}

// function createDay(obj, startDate, setDaysArr) {
//     updateLocalArrDays(startDate, obj);
//     const day = startDate.getDate();
//     const monthId = startDate.getMonth();

//     obj.prevDay = day;
//     obj.isLeft = !obj.isLeft;
//     const bool = obj.isLeft;
//     setDaysArr(prev => {
//         return [
//             ...prev,
//             {
//                 isLeft: bool,
//                 monthId,
//                 day,
//                 ranges: [],
//             },
//         ];
//     });
// }

// function createAllBusyDay(setDaysArr, startDate, obj, id) {
//     updateLocalArrDays(startDate, obj);
//     const day = startDate.getDate();
//     const monthId = startDate.getMonth();
//     obj.isLeft = !obj.isLeft;
//     const bool = obj.isLeft;
//     setDaysArr(prev => {
//         return [
//             ...prev,
//             {
//                 isLeft: bool,
//                 isAllBusy: true,
//                 monthId,
//                 day,
//                 id: id,
//             },
//         ];
//     });
// }
// function updateLocalArrDays(startDate, obj) {
//     const day = startDate.getDate();
//     obj.arrDays.push({
//         day,
//     });
// }

// function updateDay(range, setDaysArr) {
//     setDaysArr(prev => {
//         const lastIndex = prev.length - 1;
//         const updatedDaysArr = [...prev];
//         updatedDaysArr[lastIndex].ranges = [
//             ...updatedDaysArr[lastIndex].ranges,
//             range,
//         ];
//         return updatedDaysArr;
//     });
// }

function createDay(setDaysArr, range, obj) {
    const start = new Date(range.startDate);
    const newBool = obj.isLeft;
    obj.isLeft = !obj.isLeft;
    setDaysArr(prev => [
        ...prev,
        {
            monthId: start.getMonth(),
            day: start.getDate(),
            isLeft: newBool,
            ranges: [range],
            isAllBusy: isFullDayRange(range.startDate, range.endDate),
            id: range.id,
        },
    ]);
}

function updateLastDay(setDaysArr, range) {
    setDaysArr(prev => {
        const tempArr = prev;
        const lastInd = tempArr.length - 1;
        tempArr[lastInd] = {
            ...tempArr[lastInd],
            ranges: [...tempArr[lastInd].ranges, range],
        };
        return tempArr;
    });
}

function formatDateToISO(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}
function checkDayInArray(arr, targetDay) {
    return arr.some(item => item.day === targetDay);
}

export default function BusyRangeList() {
    const { busyRanges } = useSelector(state => state.profile);
    let [daysArr, setDaysArr] = useState([]);

    useEffect(() => {
        const obj = {
            prevDay: null,
            isLeft: false,
            arrDays: [],
        };

        setDaysArr([]);
        daysArr = [];
        busyRanges.forEach(range => {
            const start = new Date(range.startDate);
            const end = new Date(range.endDate);

            if (!isSameDay(obj.prevDay, start))
                createDay(setDaysArr, range, obj);
            else updateLastDay(setDaysArr, range);

            obj.prevDay = start;
        });
    }, [busyRanges]);

    return (
        <div className={cls.wrapper}>
            {daysArr.map((day, index) => (
                <Day
                    key={day.id}
                    monthId={day.monthId}
                    day={day.day}
                    isLeft={day.isLeft}
                    ranges={day.ranges}
                    isAllBusy={day.isAllBusy}
                    id={day.id}
                />
            ))}
            {daysArr.length < 1 && (
                <div className={cls.alertEmptyList}>Здесь пока пусто.</div>
            )}
        </div>
    );
}
