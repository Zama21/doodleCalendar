import React, { useState } from 'react';
import cls from './BusyRangeSelection.module.css';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { FormFieldDateTime } from 'shared/ui/components/FormComponents/FormFieldDateTime/FormFieldDateTime';
import { FormButton } from 'shared/ui/components/FormComponents/FormButton/FormButton';
import classNames from 'classnames';
import DaysOfWeek from 'shared/ui/components/DaysOfWeek/DaysOfWeek';

const currentDate = new Date()
    .toLocaleString('sv', {
        timeZone: 'Europe/Moscow',
        hour12: false,
    })
    .slice(0, 16)
    .replace(',', '')
    .replace(' ', 'T');

const initialDaysOfTheWeek = [
    { id: 0, label: 'Пн', isSelected: false },
    { id: 1, label: 'Вт', isSelected: false },
    { id: 2, label: 'Ср', isSelected: false },
    { id: 3, label: 'Чт', isSelected: false },
    { id: 4, label: 'Пт', isSelected: false },
    { id: 5, label: 'Сб', isSelected: false },
    { id: 6, label: 'Вс', isSelected: false },
];

const isEndTimeValid = function (value) {
    const startTime = this.parent.startTime;
    const endTime = value;

    if (startTime && endTime) {
        const startHour = parseInt(startTime.split(':')[0]);
        const startMinute = parseInt(startTime.split(':')[1]);
        const endHour = parseInt(endTime.split(':')[0]);
        const endMinute = parseInt(endTime.split(':')[1]);

        if (
            endHour > startHour ||
            (endHour === startHour && endMinute > startMinute)
        ) {
            return true;
        }
        return false;
    }
    return true;
};

function getSelectedIds(arr) {
    return arr.filter(item => item.isSelected).map(item => item.id);
}

export default function BusyRangeSelection({
    setBusyRanges,
    setBusyRangesInterval,
    isShowDayOfTheWeek,
    daysOfTheWeek,
    setDaysOfTheWeek,
}) {
    // const [startTime, setStartTime] = useState('');
    // const [endTime, setEndTime] = useState('');

    // const handleStartTimeChange = event => {
    //     setStartTime(event.target.value);
    // };

    // const handleEndTimeChange = event => {
    //     setEndTime(event.target.value);
    // };

    // const handleAddRange = () => {
    //     // Добавить диапазон в список занятости
    //     // Например, с помощью обратного вызова, переданного из родительского компонента
    // };

    const handleDayClick = index => {
        setDaysOfTheWeek(prev => {
            const updatedDays = [...prev];
            updatedDays[index] = {
                ...updatedDays[index],
                isSelected: !updatedDays[index].isSelected,
            };
            return updatedDays;
        });
    };

    return (
        <div className={cls.wrapper}>
            <Formik
                initialValues={{
                    startDate: currentDate,
                    endDate: currentDate,
                    startTime: '15:00',
                    endTime: '16:00',
                }}
                validationSchema={Yup.object({
                    startDate: Yup.date()
                        .max(
                            Yup.ref('endDate'),
                            'Начальная дата не может быть позже конечной даты!'
                        )
                        .required('Все даты должны быть заданы!'),
                    endDate: Yup.date().required(
                        'Все даты должны быть заданы!'
                    ),
                    endTime: Yup.string().test(
                        'is-greater',
                        'Конечное время должно быть позже начального!',
                        isEndTimeValid
                    ),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    console.log('OnSubmit');

                    if (isShowDayOfTheWeek) {
                        setBusyRangesInterval(prev => {
                            return [
                                ...prev,
                                ...getSelectedIds(daysOfTheWeek).map(id => {
                                    return {
                                        startTime: values.startTime,
                                        endTime: values.endTime,
                                        dayId: id,
                                    };
                                }),
                            ];
                        });
                        setDaysOfTheWeek(initialDaysOfTheWeek);
                    } else
                        setBusyRanges(prev => {
                            return [
                                ...prev,
                                {
                                    startDate: values.startDate,
                                    endDate: values.endDate,
                                },
                            ];
                        });
                }}
            >
                {formik => (
                    <Form onSubmit={formik.handleSubmit} className={cls.form}>
                        <div className={cls.dateInputFormContainer}>
                            <div className={cls.wrapperDates}>
                                <div className={cls.wrapperDate}>
                                    <span>C: </span>
                                    {!isShowDayOfTheWeek && (
                                        <FormFieldDateTime
                                            name='startDate'
                                            IsShowError={false}
                                            fieldClassName={cls.field}
                                        />
                                    )}
                                    {isShowDayOfTheWeek && (
                                        <FormFieldDateTime
                                            name='startTime'
                                            IsShowError={false}
                                            fieldClassName={cls.field}
                                            type='time'
                                        />
                                    )}
                                </div>
                                <div className={cls.wrapperDate}>
                                    <span>По: </span>
                                    {!isShowDayOfTheWeek && (
                                        <FormFieldDateTime
                                            name='endDate'
                                            IsShowError={false}
                                            fieldClassName={cls.field}
                                        />
                                    )}
                                    {isShowDayOfTheWeek && (
                                        <FormFieldDateTime
                                            name='endTime'
                                            IsShowError={false}
                                            fieldClassName={cls.field}
                                            type='time'
                                        />
                                    )}
                                </div>
                            </div>
                            <FormButton type='submit' className={cls.btnCreate}>
                                +
                            </FormButton>
                        </div>
                        {formik.errors &&
                            Object.keys(formik.errors).length > 0 &&
                            formik.touched.endDate &&
                            formik.touched.startDate &&
                            formik.touched.endTime &&
                            formik.touched.startTime && (
                                <div className={cls.errorValidationBox}>
                                    {formik.errors.startDate &&
                                        formik.touched.startDate && (
                                            <p>
                                                Ошибка валидации:{' '}
                                                {formik.errors.startDate}
                                            </p>
                                        )}
                                    {formik.errors.endDate &&
                                        formik.touched.endDate && (
                                            <p>
                                                {' '}
                                                Ошибка валидации:{' '}
                                                {formik.errors.endDate}
                                            </p>
                                        )}
                                    {formik.errors.endTime &&
                                        formik.touched.endTime && (
                                            <p>
                                                {' '}
                                                Ошибка валидации:{' '}
                                                {formik.errors.endTime}
                                            </p>
                                        )}
                                </div>
                            )}

                        <DaysOfWeek
                            isShowDayOfTheWeek={isShowDayOfTheWeek}
                            daysOfTheWeek={daysOfTheWeek}
                            handleDayClick={handleDayClick}
                        />
                    </Form>
                )}
            </Formik>
        </div>
    );
}
