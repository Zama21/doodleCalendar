import React from 'react';
import EventInfoText from './EventInfoText/EventInfoText';

export default function eventInfoObj(event) {
    return {
        title: event.title,
        btnText: 'Понятно',
        text: <EventInfoText {...event} />,
    };
}
