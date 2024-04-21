import React, { useState } from 'react';
import cls from './BusyRangeSelection.module.css';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { FormFieldDateTime } from 'shared/ui/components/FormComponents/FormFieldDateTime/FormFieldDateTime';
import { FormButton } from 'shared/ui/components/FormComponents/FormButton/FormButton';

export default function BusyRangeSelection({ setBusyRanges }) {
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

    return (
        <div className={cls.wrapper}>
            <Formik
                initialValues={{
                    startDate: new Date()
                        .toLocaleString('sv', {
                            timeZone: 'Europe/Moscow',
                            hour12: false,
                        })
                        .slice(0, 16)
                        .replace(',', '')
                        .replace(' ', 'T'),
                    endDate: '',
                }}
                validationSchema={Yup.object({
                    startDate: Yup.date()
                        .max(
                            Yup.ref('endDate'),
                            'Начальная дата не может быть позже конечной даты'
                        )
                        .required('Обязательное поле'),
                    endDate: Yup.date().required('Обязательное поле'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    console.log('OnSubmit');
                    setBusyRanges(prev => {
                        return [
                            ...prev,
                            {
                                startDate: values.startDate,
                                endDate: values.endDate,
                            },
                        ];
                    });
                    // console.log(values);
                }}
            >
                {formik => (
                    <Form onSubmit={formik.handleSubmit} className={cls.form}>
                        <div className={cls.wrapperDates}>
                            <div className={cls.wrapperDate}>
                                <span>C: </span>
                                <FormFieldDateTime
                                    name='startDate'
                                    // label={'Дата начала'}
                                    value={formik.values.startDate}
                                />
                            </div>
                            <div className={cls.wrapperDate}>
                                <span>По: </span>
                                <FormFieldDateTime
                                    name='endDate'
                                    // label={'Дата окончания'}
                                />
                            </div>
                        </div>
                        <FormButton type='submit' className={cls.btnCreate}>
                            +
                        </FormButton>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
