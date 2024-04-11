import React from 'react';

import { EventsProvider } from './EventsContext';
import EventsSection from './components/EventsSection/EventsSection';

export default function EventsPage() {
    return (
        <EventsProvider>
            <EventsSection />
        </EventsProvider>
    );
}
