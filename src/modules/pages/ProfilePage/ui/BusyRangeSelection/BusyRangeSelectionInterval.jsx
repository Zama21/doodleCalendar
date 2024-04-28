import React from 'react';
import cls from './BusyRangeSelection.module.css';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { FormFieldDateTime } from 'shared/ui/components/FormComponents/FormFieldDateTime/FormFieldDateTime';
import { FormButton } from 'shared/ui/components/FormComponents/FormButton/FormButton';
import DaysOfWeek from 'shared/ui/components/DaysOfWeek/DaysOfWeek';
import { getId } from 'shared/lib/getId.js';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { profileActions } from '../../store/profilePageSlice';

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

export default function BusyRangeSelectionInterval() {
    const dispatch = useDispatch();
    const { isShowDayOfTheWeek, daysOfTheWeek } = useSelector(
        state => state.profile
    );

    const handleDayClick = index => {
        const updatedDays = [...daysOfTheWeek];
        updatedDays[index] = {
            ...updatedDays[index],
            isSelected: !updatedDays[index].isSelected,
        };
        dispatch(profileActions.setDaysOfTheWeek(updatedDays));
    };

    return (
        <div className={cls.wrapper}>
            <Formik
                initialValues={{
                    startTime: '15:00',
                    endTime: '16:00',
                }}
                validationSchema={Yup.object({
                    endTime: Yup.string().test(
                        'is-greater',
                        'Конечное время должно быть позже начального.',
                        isEndTimeValid
                    ),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    dispatch(
                        profileActions.addRangesToBusyRangesInterval([
                            ...getSelectedIds(daysOfTheWeek).map(id => {
                                return {
                                    startTime: values.startTime,
                                    endTime: values.endTime,
                                    dayId: id,
                                    id: getId(),
                                };
                            }),
                        ])
                    );
                    dispatch(
                        profileActions.setDaysOfTheWeek(initialDaysOfTheWeek)
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
                                        name='startTime'
                                        IsShowError={false}
                                        fieldClassName={cls.field}
                                        type='time'
                                    />
                                </div>
                                <div className={cls.wrapperDate}>
                                    <span>По: </span>

                                    <FormFieldDateTime
                                        name='endTime'
                                        IsShowError={false}
                                        fieldClassName={cls.field}
                                        type='time'
                                    />
                                </div>
                            </div>
                            <FormButton type='submit' className={cls.btnCreate}>
                                +
                            </FormButton>
                        </div>

                        {formik.errors.endTime && (
                            <div className={cls.errorValidationBox}>
                                <p>{formik.errors.endTime}</p>
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
