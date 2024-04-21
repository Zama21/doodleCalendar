import React, { useEffect, useState } from 'react';
import cls from './BusyRangeList.module.css';
import classNames from 'classnames';
import Day from './ui/Day/Day';

// function sortDates(dateArray) {
//     dateArray.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
//     return dateArray;
// }

function mergeOverlappingDates(dateArray) {
    dateArray.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    if (!dateArray[0]) return [];

    const mergedDates = [dateArray[0]];

    for (let i = 1; i < dateArray.length; i++) {
        const current = dateArray[i];
        const lastMerged = mergedDates[mergedDates.length - 1];

        if (new Date(current.startDate) <= new Date(lastMerged.endDate)) {
            lastMerged.endDate =
                current.endDate > lastMerged.endDate
                    ? current.endDate
                    : lastMerged.endDate;
        } else {
            mergedDates.push(current);
        }
    }

    return mergedDates;
}
function isSameDay(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

function createDay(obj, startDate, setDaysArr) {
    updateLocalArrDays(startDate, obj);
    const day = startDate.getDate();
    const monthId = startDate.getMonth();

    obj.prevDay = day;
    obj.isLeft = !obj.isLeft;
    const bool = obj.isLeft;
    setDaysArr(prev => {
        return [
            ...prev,
            {
                isLeft: bool,
                monthId,
                day,
                ranges: [],
            },
        ];
    });
}

function createAllBusyDay(setDaysArr, startDate, obj) {
    updateLocalArrDays(startDate, obj);
    const day = startDate.getDate();
    const monthId = startDate.getMonth();
    obj.isLeft = !obj.isLeft;
    const bool = obj.isLeft;
    setDaysArr(prev => {
        return [
            ...prev,
            {
                isLeft: bool,
                isAllBusy: true,
                monthId,
                day,
            },
        ];
    });
}
function updateLocalArrDays(startDate, obj) {
    const day = startDate.getDate();
    obj.arrDays.push({
        day,
    });
}

function updateDay(range, setDaysArr) {
    setDaysArr(prev => {
        const lastIndex = prev.length - 1;
        const updatedDaysArr = [...prev];
        updatedDaysArr[lastIndex].ranges = [
            ...updatedDaysArr[lastIndex].ranges,
            range,
        ];
        return updatedDaysArr;
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

export default function BusyRangeList({ busyRanges }) {
    let [daysArr, setDaysArr] = useState([]);

    // console.log(busyRanges);
    // console.log(mergeOverlappingDates(busyRanges));

    useEffect(() => {
        const obj = {
            prevDay: null,
            isLeft: false,
            arrDays: [],
        };

        setDaysArr([]);
        daysArr = [];
        mergeOverlappingDates(busyRanges).forEach(range => {
            const startDate = new Date(range.startDate);
            const endDate = new Date(range.endDate);
            const day = startDate.getDate();
            if (isSameDay(startDate, endDate)) {
                if (obj.prevDay != day) {
                    createDay(obj, startDate, setDaysArr);
                }
                updateDay(range, setDaysArr);
            } else {
                const startDateCopy = new Date(startDate);
                const endDateCopy = new Date(endDate);

                if (
                    startDateCopy.getHours() !== 0 &&
                    startDateCopy.getMinutes() !== 0
                ) {
                    startDateCopy.setHours(23);
                    startDateCopy.setMinutes(59);
                    const newRange = {
                        startDate: range.startDate,
                        endDate: formatDateToISO(startDateCopy),
                    };
                    if (!checkDayInArray(obj.arrDays, startDate.getDate())) {
                        createDay(obj, startDate, setDaysArr);
                    }

                    updateDay(newRange, setDaysArr);
                    startDateCopy.setDate(startDateCopy.getDate() + 1);
                    startDateCopy.setHours(0);
                    startDateCopy.setMinutes(0);
                }
                while (
                    startDateCopy.getHours() === 0 &&
                    startDateCopy.getMinutes() === 0 &&
                    !isSameDay(startDateCopy, endDateCopy)
                ) {
                    createAllBusyDay(setDaysArr, startDateCopy, obj);
                    startDateCopy.setDate(startDateCopy.getDate() + 1);
                }

                if (
                    endDateCopy.getHours() === 23 &&
                    endDateCopy.getMinutes() === 59
                ) {
                    createAllBusyDay(setDaysArr, startDateCopy, obj);
                } else {
                    if (
                        !checkDayInArray(obj.arrDays, startDateCopy.getDate())
                    ) {
                        createDay(obj, startDateCopy, setDaysArr);
                    }
                    const newRange = {
                        startDate: formatDateToISO(startDateCopy),
                        endDate: range.endDate,
                    };
                    updateDay(newRange, setDaysArr);
                }
            }
        });
    }, [busyRanges]);

    console.log(daysArr);

    return (
        <div className={cls.wrapper}>
            {daysArr.map((day, index) => {
                return (
                    <Day
                        key={index}
                        monthId={day.monthId}
                        day={day.day}
                        isLeft={day.isLeft}
                        ranges={day.ranges}
                        isAllBusy={day.isAllBusy}
                    ></Day>
                );
            })}
            {/* <div className={classNames(cls.wrapperDay, cls.left)}>
                <div className={cls.day}>10 мая</div>
                <div className={cls.timeList}>
                    <ul>
                        <li>13:00 - 23:00</li>
                        <li>1:23 - 2:00</li>
                        <li>5:13 - 16:00</li>
                        <li>13:00 - 23:00</li> <li>13:00 - 23:00</li>
                        <li>1:23 - 2:00</li>
                        <li>5:13 - 16:00</li>
                        <li>13:00 - 23:00</li> <li>13:00 - 23:00</li>
                        <li>1:23 - 2:00</li>
                        <li>5:13 - 16:00</li>
                        <li>13:00 - 23:00</li> <li>13:00 - 23:00</li>
                        <li>1:23 - 2:00</li>
                        <li>5:13 - 16:00</li>
                        <li>13:00 - 23:00</li>
                    </ul>
                </div>
            </div> */}
            {/* <div className={classNames(cls.wrapperDay, cls.right)}></div>
            <div className={classNames(cls.wrapperDay, cls.left)}></div>
            <div className={classNames(cls.wrapperDay, cls.right)}></div>
            <div className={classNames(cls.wrapperDay, cls.left)}></div>
            <div className={classNames(cls.wrapperDay, cls.right)}></div>
            <div className={classNames(cls.wrapperDay, cls.left)}></div>
            <div className={classNames(cls.wrapperDay, cls.right)}></div>
            <div className={classNames(cls.wrapperDay, cls.left)}></div> */}

            {/* <h3>Диапазоны занятости:</h3> */}
            {/* <ul>
                    {busyRanges.map((range, index) => {
                        console.log(new Date(range.startDate));
                        return (
                            <li key={index}>
                                {range.startDate} - {range.endDate}
                            </li>
                        );
                    })}
                </ul> */}
        </div>
    );
}
