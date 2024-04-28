import React from 'react';
import cls from './BusyRangeSelection.module.css';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { FormFieldDateTime } from 'shared/ui/components/FormComponents/FormFieldDateTime/FormFieldDateTime';
import { FormButton } from 'shared/ui/components/FormComponents/FormButton/FormButton';
import { getId } from 'shared/lib/getId.js';
import { useDispatch } from 'react-redux';
import { profileActions } from '../../store/profilePageSlice';

const currentDate = new Date()
    .toLocaleString('sv', {
        timeZone: 'Europe/Moscow',
        hour12: false,
    })
    .slice(0, 16)
    .replace(',', '')
    .replace(' ', 'T');

function increaseDate(date) {
    date.setDate(date.getDate() + 1);
}

function setTime(date, hours, minutes) {
    date.setHours(hours);
    date.setMinutes(minutes);
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

function isSameDay(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}
function splitDateRange({ startDate, endDate }) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start.getDate() === end.getDate())
        return [{ startDate, endDate, id: getId() }];

    const result = [];

    let currentDateStart = new Date(start);
    let currentDateEnd = new Date(start);
    setTime(currentDateEnd, 23, 59);
    result.push({
        startDate,
        endDate: formatDateToISO(currentDateEnd),
        id: getId(),
    });
    increaseDate(currentDateStart);
    increaseDate(currentDateEnd);
    setTime(currentDateStart, 0, 0);

    while (currentDateStart < end && !isSameDay(currentDateStart, end)) {
        result.push({
            startDate: formatDateToISO(currentDateStart),
            endDate: formatDateToISO(currentDateEnd),
            id: getId(),
        });
        increaseDate(currentDateStart);
        increaseDate(currentDateEnd);
    }
    result.push({
        startDate: formatDateToISO(currentDateStart),
        endDate,
        id: getId(),
    });

    return result;
}

export default function BusyRangeSelection() {
    const dispatch = useDispatch();

    return (
        <div className={cls.wrapper}>
            <Formik
                initialValues={{
                    startDate: currentDate,
                    endDate: currentDate,
                }}
                validationSchema={Yup.object({
                    startDate: Yup.date()
                        .max(
                            Yup.ref('endDate'),
                            'Конечное время должно быть позже начального.'
                        )
                        .required('Все даты должны быть заданы.'),
                    endDate: Yup.date().required(
                        'Все даты должны быть заданы.'
                    ),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    dispatch(
                        profileActions.addRangesToBusyRanges(
                            splitDateRange({
                                startDate: values.startDate,
                                endDate: values.endDate,
                            })
                        )
                    );
                }}
            >
                {formik => (
                    <Form onSubmit={formik.handleSubmit} className={cls.form}>
                        <div className={cls.dateInputFormContainer}>
                            <div className={cls.wrapperDates}>
                                <div className={cls.wrapperDate}>
                                    <span>C: </span>
                                    <FormFieldDateTime
                                        name='startDate'
                                        IsShowError={false}
                                        fieldClassName={cls.field}
                                        maxDateTime={formik.values.endDate}
                                    />
                                </div>
                                <div className={cls.wrapperDate}>
                                    <span>По: </span>
                                    <FormFieldDateTime
                                        name='endDate'
                                        IsShowError={false}
                                        fieldClassName={cls.field}
                                    />
                                </div>
                            </div>
                            <FormButton type='submit' className={cls.btnCreate}>
                                +
                            </FormButton>
                        </div>

                        {(formik.errors.endDate || formik.errors.startDate) && (
                            <div className={cls.errorValidationBox}>
                                {formik.errors.startDate && (
                                    <p>{formik.errors.startDate}</p>
                                )}
                                {formik.errors.endDate && (
                                    <p>{formik.errors.endDate}</p>
                                )}
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
}
