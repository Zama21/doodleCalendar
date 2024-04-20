import React, { useEffect, useState } from 'react';
import cls from './EventInfoText.module.css';
import classNames from 'classnames';
import SearchResults from './ui/SearchResults/SearchResults';

const options = {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
};

export default function EventInfoText({
    members,
    start,
    myStart,
    end,
    myEnd,
    description,
    resourceId: rooms,
}) {
    const [searchMode, setSearchMode] = useState(false);
    const [isAnimated, setIsAnimated] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [filteredMembers, setFilteredMembers] = useState([]);

    const formattedStartDate = new Date(myStart ?? start)
        .toLocaleString(undefined, options)
        .split(',')
        .join(' \u200E  \u200E');
    const formattedEndDate = new Date(myEnd ?? end)
        .toLocaleString(undefined, options)
        .split(',')
        .join(' \u200E  \u200E');

    const handleEditClick = () => {
        setIsAnimated(prev => !prev);
        setTimeout(() => {
            setSearchMode(prev => !prev);
        }, 300);
    };

    useEffect(() => {
        updateFilteredMembers(searchInput);
    }, [members]);

    function updateFilteredMembers(inputValue) {
        const filtered = members.filter(member =>
            member.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredMembers(filtered);
    }

    const handleInputChange = e => {
        const input = e.target.value;
        setSearchInput(input);
        updateFilteredMembers(input);
    };

    const memberCount = members.length;
    let memberText = 'участников';
    if (
        memberCount % 100 === 11 ||
        memberCount % 100 === 12 ||
        memberCount % 100 === 13 ||
        memberCount % 100 === 14
    ) {
        memberText = 'участников';
    } else if (memberCount % 10 === 1) {
        memberText = 'участник';
    } else if (memberCount % 10 > 1 && memberCount % 10 < 4) {
        memberText = 'участника';
    }

    function handleCheckMarkClick() {
        handleEditClick();
    }

    return (
        <div className={cls.wrapperContent}>
            {searchMode ? (
                <div
                    className={classNames(cls.wrapperSearchInput, {
                        [cls.close]: !isAnimated,
                    })}
                >
                    <input
                        type='text'
                        placeholder='Начните писать...'
                        onChange={handleInputChange}
                    />
                    <div
                        className={classNames(cls.itemForm, {
                            [cls.close]: !isAnimated,
                        })}
                        onClick={handleCheckMarkClick}
                    >
                        &#10004;
                    </div>
                </div>
            ) : (
                <div
                    className={classNames(cls.membersCount, {
                        [cls.close]: isAnimated,
                    })}
                    onClick={handleEditClick}
                >
                    {memberCount} {memberText} 👨‍👨‍👦
                </div>
            )}

            <div className={cls.content}>
                {searchMode ? (
                    <SearchResults members={filteredMembers} />
                ) : (
                    <>
                        <p className={cls.subTitle}>Время проведения:</p>
                        <div className={cls.wrapperDate}>
                            <p>
                                с &nbsp;&nbsp;
                                <span className={cls.date}>
                                    {formattedStartDate}
                                </span>
                            </p>
                            <p>
                                по&nbsp;
                                <span className={cls.date}>
                                    {formattedEndDate}
                                </span>
                            </p>
                        </div>
                        <p>
                            <span className={cls.subTitle}>
                                Задействованные помещения:
                            </span>{' '}
                            {rooms.join(', ')}
                        </p>
                        <div className={cls.wrapperDescription}>
                            <h3>Описание мероприятия</h3>
                            <p className={cls.description}>{description}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
