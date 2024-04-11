import React, { useContext } from 'react';
import cls from './EventsSection.module.css';
import EventSelectedUsers from '../EventSelectedUsers/EventSelectedUsers';
import EventsList from '../EventsList/EventsList';
import EventDetails from '../EventDetails/EventDetails';

export default function EventsSection() {
    return (
        <div className={cls.wrapperEventsPage}>
            <div className={cls.wrapperLeftMenu}>
                <EventsList />
                <EventSelectedUsers />
            </div>

            <EventDetails />
        </div>
    );
}
