import React, { useState } from 'react';
import cls from './SwitcherBox.module.css';
import classNames from 'classnames';
import BusyRangeList from '../BusyRangeList/BusyRangeList';
import BusyRangeListInterval from '../BusyRangeListInterval/BusyRangeListInterval';

const states = ['Единоразовые', 'Повторяющиеся'];

export default function SwitcherBox({
    busyRanges,
    busyRangesInterval,
    removeRangeById,
    selectedState,
    setSelectedState,
    removeRangeIntervalById,
    setBusyRangesInterval,
}) {
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
                            onClick={() => setSelectedState(state)}
                        >
                            {state}
                        </div>
                    );
                })}
            </div>
            <div className={cls.content}>
                {selectedState === 'Единоразовые' && (
                    <BusyRangeList
                        busyRanges={busyRanges}
                        removeRangeById={removeRangeById}
                    />
                )}
                {selectedState === 'Повторяющиеся' && (
                    <BusyRangeListInterval
                        busyRangesInterval={busyRangesInterval}
                        removeRangeIntervalById={removeRangeIntervalById}
                        setBusyRangesInterval={setBusyRangesInterval}
                    />
                )}
            </div>
        </div>
    );
}
