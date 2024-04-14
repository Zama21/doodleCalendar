import React from 'react';
import cls from './EventDetailsContent.module.css';
import { Formik, Form, Field } from 'formik';
import { FormField } from 'shared/ui/components/FormComponents/FormField/FormField';
import { FormFieldTextArea } from 'shared/ui/components/FormComponents/FormFieldTextArea/FormFieldTextArea';
import FormCustomSelectOption from 'shared/ui/components/FormComponents/FormCustomSelectOption/FormCustomSelectOption';
import { FormButton } from 'shared/ui/components/FormComponents/FormButton/FormButton';
import { FormFieldDateTime } from 'shared/ui/components/FormComponents/FormFieldDateTime/FormFieldDateTime';
import * as Yup from 'yup';

export default function EventDetailsContent() {
    return (
        <div className={cls.eventDetailsContent}>
            <Formik
                initialValues={{
                    eventName: '',
                    startDate: new Date()
                        .toLocaleString('sv', {
                            timeZone: 'Europe/Moscow',
                            hour12: false,
                        })
                        .slice(0, 16)
                        .replace(',', '')
                        .replace(' ', 'T'),
                    endDate: '',
                    description: '',
                    room: null,
                }}
                validationSchema={Yup.object({
                    eventName: Yup.string()
                        .min(4, 'Название должно быть не короче 4 символов')
                        .required('Обязательное поле'),
                    room: Yup.string().required('Обязательное поле'),
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
                    console.log(values);
                }}
            >
                {formik => (
                    <Form onSubmit={formik.handleSubmit} className={cls.form}>
                        <div>
                            <div className={cls.wrapperNameAndRoom}>
                                <FormField
                                    name='eventName'
                                    type='text'
                                    label={'Название мероприятия'}
                                    autoComplete='eventName'
                                />
                                <FormCustomSelectOption
                                    options={[
                                        'Кабинет 101',
                                        'Кабинет 102',
                                        'Кабинет 103',
                                        'Кабинет 104',
                                    ]}
                                    name='room'
                                    label='Кабинеты'
                                    IsClearSelection='true'
                                    clearSelectionText='Очистить'
                                />
                            </div>
                            <FormFieldTextArea
                                name='description'
                                type='text'
                                label={'Описание'}
                            />
                            <div className={cls.wrapperDates}>
                                <FormFieldDateTime
                                    name='startDate'
                                    label={'Дата начала'}
                                    value={formik.values.startDate}
                                />
                                <FormFieldDateTime
                                    name='endDate'
                                    label={'Дата окончания'}
                                />
                            </div>
                        </div>

                        <FormButton type='submit' className={cls.submitBtn}>
                            Сохранить
                        </FormButton>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
