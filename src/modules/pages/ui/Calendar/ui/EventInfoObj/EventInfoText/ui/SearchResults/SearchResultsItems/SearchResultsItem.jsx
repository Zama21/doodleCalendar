import React from 'react';
import cls from './SearchResultsItem.module.css';

export default function SearchResultsItem({ member }) {
    return (
        <li className={cls.userItem}>
            <div className={cls.wrapperFio}>{member}</div>
        </li>
    );
}
