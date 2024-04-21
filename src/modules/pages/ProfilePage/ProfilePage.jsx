import React, { useState } from 'react';
import cls from './ProfilePage.module.css';
import BusyRangeSelection from './ui/BusyRangeSelection/BusyRangeSelection';
import BusyRangeList from './ui/BusyRangeList/BusyRangeList';
const initialBusyRanges = [];
export default function ProfilePage() {
    const [busyRanges, setBusyRanges] = useState(initialBusyRanges);

    return (
        <div className={cls.wrapperPage}>
            <img
                src='https://cs13.pikabu.ru/avatars/1873/x1873132-1972677953.png'
                alt='Profile Picture'
                className={cls.profileImage}
            />
            <div className={cls.wrapperUserBusyness}>
                <p>
                    Здравствуйте, Мария Юрьевна, укажите время, когда вы заняты:
                </p>
                <BusyRangeSelection setBusyRanges={setBusyRanges} />
                <BusyRangeList busyRanges={busyRanges} />
            </div>
        </div>
    );
}
