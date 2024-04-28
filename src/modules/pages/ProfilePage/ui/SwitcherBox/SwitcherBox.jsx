import React from 'react';
import cls from './SwitcherBox.module.css';
import classNames from 'classnames';
import BusyRangeList from '../BusyRangeList/BusyRangeList';
import BusyRangeListInterval from '../BusyRangeListInterval/BusyRangeListInterval';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { profileActions } from '../../store/profilePageSlice';

const states = ['Единоразовые', 'Повторяющиеся'];

export default function SwitcherBox() {
    const dispatch = useDispatch();
    const { selectedState } = useSelector(state => state.profile);

    return (
        <div className={cls.wrapperSwitcherBox}>
            <div className={cls.switchStates}>
                {states.map(state => {
                    return (
                        <div
                            className={classNames(cls.state, {
                                [cls.selected]: selectedState === state,
                            })}
                            key={state}
                            onClick={() =>
                                dispatch(profileActions.setSelectedState(state))
                            }
                        >
                            {state}
                        </div>
                    );
                })}
            </div>
            <div className={cls.content}>
                {selectedState === 'Единоразовые' && <BusyRangeList />}
                {selectedState === 'Повторяющиеся' && <BusyRangeListInterval />}
            </div>
        </div>
    );
}
