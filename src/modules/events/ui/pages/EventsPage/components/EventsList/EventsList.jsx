import React, { useContext } from 'react';
import cls from './EventsList.module.css';
import classNames from 'classnames';
import { EventsContext } from '../../EventsContext';

export default function EventsList() {
    const { showSelectedUser } = useContext(EventsContext);
    return (
        <div
            className={classNames(
                cls.eventsList,
                {
                    [cls.close]: showSelectedUser == 2,
                },
                {
                    [cls.open]: showSelectedUser == 3 || showSelectedUser == 4,
                }
            )}
        >
            {(showSelectedUser == 0 ||
                showSelectedUser == 2 ||
                showSelectedUser == 3 ||
                showSelectedUser == 4) && (
                <>
                    <div className={cls.headerEventsList}>
                        <h2>Список мероприятий</h2>
                        <div className={cls.wrapperBtnCreateEvents}>
                            <button className={cls.createEventButton}>
                                Создать мероприятие
                            </button>
                        </div>
                    </div>
                    <div className={cls.events}>
                        <ul>
                            <li>
                                Мероприятие 1 Мероприятие 1 Мероприятие 1
                                Мероприятие 1 Мероприятие 1 Мероприятие 1
                                Мероприятие 1 Мероприятие 1 Мероприятие 1
                            </li>
                            <li>Мероприятие 2</li>
                            <li>Мероприятие 3</li>
                            <li>Мероприятие 1</li>
                            <li>Мероприятие 2</li>
                            <li>Мероприятие 3</li>
                            <li>Мероприятие 1</li>
                            <li>Мероприятие 2</li>
                            <li>Мероприятие 3</li>
                            <li>Мероприятие 1</li>
                            <li>Мероприятие 2</li>
                            <li>Мероприятие 3</li>
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
}
