import React, { useEffect, useState } from 'react';
import { CalendarApi } from 'modules/events/api/EventsPageApi/CalendarApi';
import MyCalendar from '../ui/Calendar/Calendar';
import cls from './RoomsPage.module.css';
import Combobox from 'shared/ui/components/Combobox/Combobox';

function getResources(events) {
    let resourceSet = new Set();
    events.forEach(event => {
        event.resourceId.forEach(room => {
            resourceSet.add(room);
        });
    });

    let resources = [...resourceSet].map(room => ({ id: room, title: room }));
    return resources;
}

function getOptions(resources) {
    return resources.map(option => ({
        value: option.title,
        label: option.title,
    }));
}
function getFilteredResources(resources, selectedOptions) {
    return resources.filter(resource => {
        return selectedOptions.some(option => {
            if (option.__isNew__) return resource.title.includes(option.label);
            return resource.title === option.label;
        });
    });
}
function getFilteredEvents(events, selectedOptions) {
    if (selectedOptions.length === 0) {
        return [];
    }

    return events.filter(event => {
        return selectedOptions.some(option => {
            if (option.__isNew__) {
                return event.resourceId.some(resource =>
                    resource.includes(option.value)
                );
            }
            return event.resourceId.some(resource => resource === option.value);
        });
    });
}

export default function RoomsPage() {
    const [events, setEvents] = useState([]);
    const [resources, setResources] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    console.log(selectedOptions);

    useEffect(() => {
        CalendarApi.getAllEvents()
            .then(res => {
                setEvents(res);
                setResources(getResources(res));
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <div className={cls.wrapperPage}>
                <div className={cls.wrapperComboBox}>
                    <p>Выберите нужные кабинеты:</p>
                    <Combobox
                        setSelectedOptions={setSelectedOptions}
                        options={getOptions(resources)}
                        selectedOptions={selectedOptions}
                    />
                </div>
                {/* <div className={cls.wrapperCalendar}> */}
                <MyCalendar
                    events={getFilteredEvents(events, selectedOptions)}
                    resources={getFilteredResources(resources, selectedOptions)}
                />
                {/* </div> */}
            </div>
        </>
    );
}
