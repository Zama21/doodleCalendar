import React, { useEffect, useState } from 'react';
import cls from './ProfilePage.module.css';
import BusyRangeSelection from './ui/BusyRangeSelection/BusyRangeSelection';
import BusyRangeList from './ui/BusyRangeList/BusyRangeList';

function addIdsToArrayObjects(arr) {
    arr.forEach((item, index) => {
        item.id = index + 1;
    });
    return arr;
}
export default function ProfilePage() {
    const [busyRanges, setBusyRanges] = useState([]);

    useEffect(() => {
        setBusyRanges(prev => {
            return addIdsToArrayObjects(prev);
        });
    }, [busyRanges]);

    function removeRangeById(id) {
        console.log('click', id);
        console.log(busyRanges);
        setBusyRanges(prev => prev.filter(item => item.id != id));
    }

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
                <BusyRangeList
                    busyRanges={busyRanges}
                    removeRangeById={removeRangeById}
                />
            </div>
        </div>
    );
}
