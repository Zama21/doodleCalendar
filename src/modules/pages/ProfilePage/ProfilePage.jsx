import React, { useEffect, useState } from 'react';
import cls from './ProfilePage.module.css';
import BusyRangeSelection from './ui/BusyRangeSelection/BusyRangeSelection';
import BusyRangeList from './ui/BusyRangeList/BusyRangeList';
import SwitcherBox from './ui/SwitcherBox/SwitcherBox';
import { label } from 'shared/ui/components/FormComponents/FormField/FormField.module.css';

function addIdsToArrayObjects(arr) {
    arr.forEach((item, index) => {
        item.id = index + 1;
    });
    return arr;
}

const initialDaysOfTheWeek = [
    { id: 0, label: 'Пн', isSelected: false },
    { id: 1, label: 'Вт', isSelected: false },
    { id: 2, label: 'Ср', isSelected: false },
    { id: 3, label: 'Чт', isSelected: false },
    { id: 4, label: 'Пт', isSelected: false },
    { id: 5, label: 'Сб', isSelected: false },
    { id: 6, label: 'Вс', isSelected: false },
];
function assignUniqueIdToObjects(objects) {
    for (let i = 0; i < objects.length; i++) {
        objects[i].id = i + 1;
    }
    return objects;
}

export default function ProfilePage() {
    const [busyRanges, setBusyRanges] = useState([]);
    const [busyRangesInterval, setBusyRangesInterval] = useState([]);
    const [selectedState, setSelectedState] = useState('Единоразовые');
    const [isShowDayOfTheWeek, setIsShowDayOfTheWeek] = useState(false);
    const [daysOfTheWeek, setDaysOfTheWeek] = useState(initialDaysOfTheWeek);

    // console.log(busyRanges);
    console.log(busyRangesInterval);
    useEffect(() => {
        setBusyRangesInterval(prev => assignUniqueIdToObjects(prev));
    }, [busyRangesInterval]);

    useEffect(() => {
        setBusyRanges(prev => {
            return addIdsToArrayObjects(prev);
        });
    }, [busyRanges]);

    useEffect(() => {
        if (selectedState === 'Повторяющиеся') setIsShowDayOfTheWeek(true);
        else setIsShowDayOfTheWeek(false);
    }, [selectedState]);

    function removeRangeById(id) {
        setBusyRanges(prev => prev.filter(item => item.id != id));
    }
    function removeRangeIntervalById(id) {
        setBusyRangesInterval(prev => prev.filter(item => item.id != id));
    }
    const switcherBoxObj = {
        busyRanges,
        removeRangeById,
        selectedState,
        setSelectedState,
        busyRangesInterval,
        removeRangeIntervalById,
        setBusyRangesInterval,
    };

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
                <BusyRangeSelection
                    setBusyRanges={setBusyRanges}
                    setBusyRangesInterval={setBusyRangesInterval}
                    isShowDayOfTheWeek={isShowDayOfTheWeek}
                    daysOfTheWeek={daysOfTheWeek}
                    setDaysOfTheWeek={setDaysOfTheWeek}
                />
                <SwitcherBox {...switcherBoxObj} />
            </div>
        </div>
    );
}
