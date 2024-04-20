import React, { useEffect, useState } from 'react';
import cls from './CalendarPage.module.css';
import MyCalendar from '../ui/Calendar/Calendar';
import { CalendarApi } from 'modules/events/api/EventsPageApi/CalendarApi';

export default function CalendarPage() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        CalendarApi.getAllEvents()
            .then(res => setEvents(res))
            .catch(err => console.log(err));
    }, []);

    return (
        // <div className={cls.wrapperCalendar}>
        <div className={cls.wrapperCalendarPage}>
            <MyCalendar events={events} />
        </div>
    );
}
