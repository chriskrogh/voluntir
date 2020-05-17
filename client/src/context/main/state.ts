/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react';
import { Event } from 'types/event';
import { User } from 'types/user';
import events from 'data/events';
import user from 'data/user';
import { Panels } from 'utils/constants';

export const initialState = {
    event: events[0],
    setEvent: (event: Event) => { },

    profile: user,
    setProfile: (user: User) => { },

    events,
    setEvents: (events: Event[]) => { },

    panel: Panels.HOME,
    setPanel: (panel: Panels) => { }
};

export const MainContext = createContext(initialState);
