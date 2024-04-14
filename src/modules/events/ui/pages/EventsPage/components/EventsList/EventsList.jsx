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
                            <li>Разнос студентов</li>
                            <li>
                                Награждение за самый креативный способ прогулки
                                занятий
                            </li>
                            <li>
                                Коллоквиум: Кабаки и Коллоквиум - как выжить в
                                университете
                            </li>
                            <li>
                                Совещание о том, почему кофе - основной элемент
                                утренней планерки
                            </li>
                            <li>
                                Утренняя планерка: Учебное заведение или
                                утренняя планерка - как определить разницу
                            </li>
                            <li>
                                Диссертация: как спасти мир, имея только
                                шоколадку и Wi-Fi
                            </li>
                            <li>
                                Борьба за выживание на лекции по теории
                                вероятности
                            </li>
                            <li>
                                Лабораторные работы: как превратить химическую
                                реакцию в искусство
                            </li>
                            <li>
                                Студенческий квест: в поисках потерянной тетради
                            </li>
                            <li>
                                Конференция: "Экзамены и стресс: как сохранить
                                хладнокровие"
                            </li>
                            <li>
                                Творческое хаос: когда все забыли о расписании
                            </li>
                            <li>
                                Кофейная дипломатия: как решать конфликты на
                                перерыве
                            </li>
                            <li>
                                Отчаянные меры: последний день сдачи курсовой
                            </li>
                            <li>
                                Факультатив "Живая история": когда преподаватель
                                забыл про PowerPoint
                            </li>
                            <li>
                                Студенческий stand-up: об искусстве выживания в
                                университете
                            </li>
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
}
