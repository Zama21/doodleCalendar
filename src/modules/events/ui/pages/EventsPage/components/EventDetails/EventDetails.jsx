import React, { useContext, useEffect, useState } from 'react';
import cls from './EventDetails.module.css';
import EventDetailsContent from './components/EventDetailsContent/EventDetailsContent';
import UserSearchResults from './components/UserSearchResults/UserSearchResults';
import classNames from 'classnames';
import { EventsContext } from '../../EventsContext';

export default function EventDetails() {
    const {
        setShowSelectedUser,
        getAllUsers,
        setFilteredUsers,
        unsavedSelectedUsers,
        filteredUsers,
    } = useContext(EventsContext);

    const [isSearchFocused, setSearchFocused] = useState(false);

    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        updateFiltered(searchValue, false);
    }, [unsavedSelectedUsers]);

    function handleSearchSubmit(event) {
        event.preventDefault();
    }
    function updateFiltered(inputValue, isDelete) {
        const filtered = getFilteredUsers(inputValue, isDelete);
        setFilteredUsers(filtered);
    }

    function handleInputChange(event) {
        const inputValue = event.target.value.toLowerCase();
        setSearchValue(event.target.value);
        updateFiltered(inputValue, true);
    }
    function getFilteredUsers(inputValue, isDelete) {
        const tempArr = getAllUsers().filter(user => {
            return (
                user.name.toLowerCase().includes(inputValue) ||
                user.surname.toLowerCase().includes(inputValue) ||
                user.patronymic.toLowerCase().includes(inputValue)
            );
        });
        if (isDelete) {
            return tempArr.filter((user, index) => {
                const foundUser = unsavedSelectedUsers.find(
                    item => user.id === item.id
                );
                if (foundUser) return foundUser.id != user.id;
                return true;
            });
        } else {
            return tempArr
                .map((user, index) => {
                    const foundUser = unsavedSelectedUsers.find(
                        item => user.id === item.id
                    );
                    if (foundUser) return foundUser;
                    return user;
                })
                .filter(user => {
                    const foundUser = filteredUsers.find(
                        item => user.id === item.id
                    );
                    if (
                        foundUser ||
                        user.isCheckedDefault == false ||
                        user.isCheckedDefault == undefined
                    )
                        return true;
                    return false;
                });
        }
    }

    function handleSearchFocus() {
        setSearchFocused(true);

        setShowSelectedUser(2);
    }

    function handleCheckMarkClick() {
        handleSearchBlur();
    }

    function handleCrossClick() {
        handleSearchBlur();
    }

    function handleSearchBlur() {
        setSearchFocused(false);
        setShowSelectedUser(3);
    }

    return (
        <div className={cls.eventDetails}>
            <div className={cls.headerEventDetails}>
                <h2>Информация о мероприятии</h2>
                <div className={cls.wrapperSearchForm}>
                    <form
                        onSubmit={handleSearchSubmit}
                        className={classNames(cls.formSearch, {
                            [cls.focused]: isSearchFocused,
                        })}
                    >
                        <input
                            type='text'
                            placeholder={`${
                                isSearchFocused ? '' : 'Добавьте участников...'
                            }`}
                            onFocus={handleSearchFocus}
                            onChange={handleInputChange}
                        />
                        <button type='submit'></button>
                    </form>
                    {isSearchFocused && (
                        <>
                            <div
                                className={cls.itemForm}
                                onClick={handleCheckMarkClick}
                            >
                                &#10004;
                            </div>
                            <div
                                className={cls.itemForm}
                                onClick={handleCrossClick}
                            >
                                &#10060;
                            </div>
                        </>
                    )}
                </div>
            </div>
            {isSearchFocused && <UserSearchResults />}
            {!isSearchFocused && <EventDetailsContent />}
        </div>
    );
}
