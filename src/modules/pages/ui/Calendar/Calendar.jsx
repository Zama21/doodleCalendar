import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import cls from './Calendar.module.css';
// import 'moment/locale/ru';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import ruLocale from 'date-fns/locale/ru';
import { dateFnsLocalizer } from 'react-big-calendar';
import eventInfoObj from './ui/EventInfoObj/eventInfoObj';
import { useLocalModal } from 'modules/modals/domain/hooks/useLocalModal';
import ModalAwareness from 'modules/modals/ui/Components/Modals/ModalAwareness/ModalAwareness';
import './Calendar.css';

const locales = {
    ru: ruLocale,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

// const timeRangeFormat = timeRange => {
//     const start = moment(timeRange.start).format('HH:mm');
//     const end = moment(timeRange.end).format('HH:mm');
//     return `${start} - ${end}`;
// };

function IsIncludeEventForCalendar(
    event,
    typeView,
    currentMonth,
    startOfWeek,
    endOfWeek
) {
    if (typeView === 'month' || typeView === 'agenda') {
        const lastMonth = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() - 1,
            20
        );
        const nextMonth = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() + 1,
            10
        );
        if (isEventInDateOrIncludingRange(event, lastMonth, nextMonth)) {
            return true;
        }
    } else if (typeView === 'week') {
        if (isEventInDateOrIncludingRange(event, startOfWeek, endOfWeek)) {
            return true;
        }
    } else if (typeView === 'day') {
        const startDay = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            currentMonth.getDate(),
            0,
            0
        );
        const endDay = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            currentMonth.getDate(),
            23,
            59
        );
        if (isEventInDateOrIncludingRange(event, startDay, endDay)) {
            return true;
        }
    }

    return false;
}
function isEventInDateOrIncludingRange(event, startDate, endDate) {
    return (
        (startDate <= event.start && event.start <= endDate) ||
        (startDate <= event.end && event.end <= endDate) ||
        (event.start <= startDate && endDate <= event.end)
    );
}

function getStartOfWeek(date) {
    const currentDate = new Date(date);
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(
        currentDate.getDate() -
            currentDate.getDay() +
            (currentDate.getDay() === 0 ? -6 : 1)
    );
    return startOfWeek;
}

function getEndOfWeek(date) {
    const currentDate = new Date(date);
    const endOfWeek = new Date(currentDate);
    endOfWeek.setDate(
        currentDate.getDate() -
            currentDate.getDay() +
            (currentDate.getDay() === 0 ? 0 : 7) +
            1
    );
    return endOfWeek;
}

function adjustHourRange(earliest, latest) {
    const defaultEarliest = 9;
    const defaultLatest = 18;

    if (!isFinite(earliest)) {
        earliest = defaultEarliest;
    }
    if (!isFinite(latest)) {
        latest = defaultLatest;
    }
    if (earliest < 0) {
        earliest = 0;
    }
    if (latest > 23) {
        latest = 23;
    }

    return [earliest, latest];
}
function getHourRange(events) {
    let earliestHour =
        Math.min(...events.map(event => event.start.getHours())) - 1;
    let latestHour = Math.max(...events.map(event => event.end.getHours()));

    [earliestHour, latestHour] = adjustHourRange(earliestHour, latestHour);

    return [earliestHour, latestHour];
}

function isSameDay(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

function getEventDurationInDays(start, end) {
    return end.getDate() - start.getDate() + 1;
}

function getTooEvents(event, delta) {
    const firstPartEventEnd = new Date(
        event.end.getFullYear(),
        event.end.getMonth(),
        event.end.getDate() - delta,
        23,
        59
    );

    const firstPartEventStart = new Date(
        event.end.getFullYear(),
        event.end.getMonth(),
        event.end.getDate() - delta + 1,
        0,
        0
    );
    const firstEvent = {
        ...event,
        end: firstPartEventEnd,
        myEnd: event.end,
    };
    const secondEvent = {
        ...event,
        start: firstPartEventStart,
        myStart: event.start,
    };
    return [firstEvent, secondEvent];
}
function getSplitEvent(event) {
    // if (getEventDurationInDays(event.start, event.end) == 2) {
    if (event.start.getHours() === 0 && event.start.getMinutes() === 0) {
        return getTooEvents(event, 1);
    }
    if (event.end.getHours() === 23 && event.end.getMinutes() === 59) {
        const durationEvent = getEventDurationInDays(event.start, event.end);
        return getTooEvents(event, durationEvent - 1);
    }

    const firstPartEventEnd = new Date(
        event.start.getFullYear(),
        event.start.getMonth(),
        event.start.getDate(),
        23,
        59
    );

    const thirdPartEventStart = new Date(
        event.end.getFullYear(),
        event.end.getMonth(),
        event.end.getDate(),
        0,
        0
    );
    const firstEvent = {
        ...event,
        end: firstPartEventEnd,
        myEnd: event.end,
    };

    const thirdEvent = {
        ...event,
        start: thirdPartEventStart,
        myStart: event.start,
    };
    if (getEventDurationInDays(event.start, event.end) > 2) {
        const secondPartEventStart = new Date(
            event.start.getFullYear(),
            event.start.getMonth(),
            event.start.getDate() + 1,
            0,
            0
        );
        const secondPartEventEnd = new Date(
            event.end.getFullYear(),
            event.end.getMonth(),
            event.end.getDate() - 1,
            23,
            59
        );
        const secondEvent = {
            ...event,
            start: secondPartEventStart,
            myStart: event.start,
            end: secondPartEventEnd,
            myEnd: event.end,
        };
        return [firstEvent, secondEvent, thirdEvent];
    }
    return [firstEvent, thirdEvent];
}

function MyCalendar({ events, resources }) {
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const { open, modalProps, isOpen: modalIsOpen } = useLocalModal();
    const [view, setView] = useState('month');
    const [currentMonth, setCurrentMonth] = useState(
        new Date(
            `${new Date().getFullYear()}-${
                new Date().getMonth() + 1
            }-${new Date().getDate()}`
        )
    );
    const [startOfWeek, setStartOfWeek] = useState(
        getStartOfWeek(currentMonth)
    );
    const [endOfWeek, setEndOfWeek] = useState(getEndOfWeek(currentMonth));

    let [earliestHour, latestHour] = getHourRange(filteredEvents);

    const handleSelectEvent = event => {
        open();

        setSelectedEvent(event);
    };
    const handleViewChange = newView => {
        setView(newView);
    };

    useEffect(() => {
        setFilteredEvents(() => {
            let tempArr = events.filter(event => {
                if (
                    IsIncludeEventForCalendar(
                        event,
                        view,
                        currentMonth,
                        startOfWeek,
                        endOfWeek
                    )
                ) {
                    return true;
                }

                return false;
            });

            if (view == 'week' || view == 'day') {
                tempArr = tempArr.reduce((acc, item) => {
                    if (isSameDay(item.start, item.end)) {
                        acc.push(item);
                    } else {
                        if (
                            item.start.getHours() === 0 &&
                            item.start.getMinutes() === 0 &&
                            item.end.getHours() === 23 &&
                            item.end.getMinutes() === 59
                        ) {
                            acc.push(item);
                        } else {
                            acc.push(...getSplitEvent(item));
                        }
                    }
                    return acc;
                }, []);
            }
            return tempArr.filter(event => {
                if (
                    IsIncludeEventForCalendar(
                        event,
                        view,
                        currentMonth,
                        startOfWeek,
                        endOfWeek
                    )
                ) {
                    return true;
                }

                return false;
            });
        });
    }, [currentMonth, startOfWeek, endOfWeek, view, events]);

    const handleNavigate = newDate => {
        const dayOfWeek = newDate.getDay();
        let startOfWeek = new Date(newDate);
        let endOfWeek = new Date(newDate);
        if (dayOfWeek !== 1) {
            const diff =
                newDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
            startOfWeek = new Date(newDate);
            startOfWeek.setDate(diff);
        }
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        setStartOfWeek(
            new Date(
                `${startOfWeek.getFullYear()}-${
                    startOfWeek.getMonth() + 1
                }-${startOfWeek.getDate()}`
            )
        );
        setEndOfWeek(
            new Date(
                `${endOfWeek.getFullYear()}-${endOfWeek.getMonth() + 1}-${
                    endOfWeek.getDate() + 1
                }`
            )
        );
        setCurrentMonth(
            new Date(
                `${newDate.getFullYear()}-${
                    newDate.getMonth() + 1
                }-${newDate.getDate()}`
            )
        );
    };

    return (
        <>
            <div className={cls.wrapperCalendar}>
                <Calendar
                    // style={{ height: '100%' }}
                    timeslots={2}
                    min={new Date(1970, 0, 1, earliestHour, 0)}
                    max={new Date(1970, 0, 1, latestHour, 59)}
                    onView={handleViewChange}
                    onNavigate={handleNavigate}
                    culture='ru'
                    localizer={localizer}
                    events={filteredEvents}
                    resources={resources}
                    startAccessor='start'
                    endAccessor='end'
                    allDayAccessor={event => {
                        if (
                            event.start.getHours() === 0 &&
                            event.start.getMinutes() === 0 &&
                            event.end.getHours() === 23 &&
                            event.end.getMinutes() === 59
                        ) {
                            return true;
                        } else {
                            return false;
                        }
                    }}
                    allDayMaxRows={2}
                    popup
                    // formats={{
                    //     timeGutterFormat: 'HH:mm',
                    //     eventTimeRangeFormat: timeRangeFormat,
                    // }}
                    onSelectEvent={handleSelectEvent}
                    messages={{
                        allDay: 'Весь день',
                        previous: 'Назад',
                        next: 'Вперед',
                        today: 'Сегодня',
                        month: 'Месяц',
                        week: 'Неделя',
                        day: 'День',
                        agenda: 'Повестка дня',
                        date: 'Дата',
                        time: 'Время',
                        event: 'Событие',
                        showMore: total => `+ еще ${total}`,
                    }}
                />
            </div>

            {modalIsOpen && (
                <ModalAwareness
                    {...eventInfoObj(selectedEvent)}
                    {...modalProps}
                />
            )}
        </>
    );
}

export default MyCalendar;
