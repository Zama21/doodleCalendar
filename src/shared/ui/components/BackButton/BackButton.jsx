import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import stl from './BackButton.module.css';

export const BackButton = props => {
    const navigate = useNavigate();

    const handleClick = e => {
        e.preventDefault();
        navigate(-1);
    };

    return (
        <Link className={stl.backLink} onClick={handleClick}>
            {props.children ?? props.text ?? 'Назад'}
        </Link>
    );
};
