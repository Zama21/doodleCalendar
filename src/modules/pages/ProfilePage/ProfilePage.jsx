import React, { useEffect, useState } from 'react';
import cls from './ProfilePage.module.css';
import BusyRangeSelection from './ui/BusyRangeSelection/BusyRangeSelection';
import BusyRangeList from './ui/BusyRangeList/BusyRangeList';
import SwitcherBox from './ui/SwitcherBox/SwitcherBox';
import { label } from 'shared/ui/components/FormComponents/FormField/FormField.module.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { profileActions } from './store/profilePageSlice';
import { Formik } from 'formik';
import BusyRangeSelectionInterval from './ui/BusyRangeSelection/BusyRangeSelectionInterval';

export default function ProfilePage() {
    const dispatch = useDispatch();
    const { selectedState } = useSelector(state => state.profile);

    useEffect(() => {
        if (selectedState === 'Повторяющиеся')
            dispatch(profileActions.setIsShowDayOfTheWeek(true));
        else dispatch(profileActions.setIsShowDayOfTheWeek(false));
    }, [selectedState]);

    return (
        <div className={cls.wrapperPage}>
            <img
                src='https://cs13.pikabu.ru/avatars/1873/x1873132-1972677953.png'
                alt='Profile Picture'
                className={cls.profileImage}
            />
            <div className={cls.wrapperUserBusyness}>
                <p className={cls.description}>
                    Здравствуйте, Мария Юрьевна! На данной страничке Вы сможете
                    указать время, когда будете заняты, чтобы Вас не включали в
                    какие-либо мероприятия. Вы можете указать как единоразовые
                    диапазоны своей занятости, так и повторяющиеся.
                </p>

                {selectedState !== 'Повторяющиеся' && <BusyRangeSelection />}
                {selectedState === 'Повторяющиеся' && (
                    <BusyRangeSelectionInterval />
                )}

                <SwitcherBox />
            </div>
        </div>
    );
}
