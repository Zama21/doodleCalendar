import React, { useEffect, useState } from 'react';
import cls from './NumberRangeDisplay.module.css';
import classNames from 'classnames';

export default function NumberRangeDisplay({
    numberNeighbors = 2,
    onSelect,
    start,
    end,
    selected,
    firstPageIndex,
}) {
    const [displayNumbers, setDisplayNumbers] = useState([]);

    useEffect(() => {
        setDisplayNumbers(
            Array.from({ length: numberNeighbors * 2 + 1 }, (_, index) => {
                let value =
                    index + (selected - firstPageIndex + 1 - numberNeighbors);
                if (value > start && value < end) return value;
                return '';
            }).filter(item => item !== '')
        );
        setDisplayNumbers(prev => {
            const newNumbers = [];
            if (prev.length == 0) {
                if (start != end) return [start, end];
                return [start];
            }
            prev[0] !== start + 1
                ? newNumbers.push(start, '...')
                : newNumbers.push(start);

            newNumbers.push(...prev);

            prev[prev.length - 1] !== end - 1
                ? newNumbers.push('...', end)
                : newNumbers.push(end);

            return newNumbers;
        });
    }, [selected, numberNeighbors, start, end]);

    const handleItemClick = item => {
        if (item !== '...') {
            onSelect(item + firstPageIndex - 1);
        }
    };

    return (
        <div className={cls.containerNumbers}>
            {displayNumbers.map((item, index) => {
                {
                    return (
                        (item != '...' && (
                            <div
                                className={classNames(cls.item, {
                                    [cls.selectedItem]:
                                        item == selected - firstPageIndex + 1,
                                })}
                                key={index}
                                onClick={() => handleItemClick(item)}
                            >
                                {item}
                            </div>
                        )) || (
                            <div className={cls.multipoint} key={index}>
                                {item}
                            </div>
                        )
                    );
                }
            })}
        </div>
    );
}
