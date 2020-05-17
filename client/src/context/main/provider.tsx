import React, { useReducer } from 'react';
import { Event } from 'types/event';
import { User } from 'types/user';
import { MainContext, initialState } from './state';
import Reducer from './reducer';
import ActionTypes from './actions';
import { Panels } from 'utils/constants';

interface Props {
    children: React.ReactNode | React.ReactNode[];
}

const Provider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    const setEvent = (event: Event) => {
        dispatch({ type: ActionTypes.SET_EVENT, payload: event });
    }

    const setEvents = (events: Event[]) => {
        dispatch({ type: ActionTypes.SET_EVENTS, payload: events });
    }

    const setProfile = (user: User) => {
        dispatch({ type: ActionTypes.SET_PROFILE, payload: user });
    }

    const setPanel = (panel: Panels) => {
        dispatch({ type: ActionTypes.SET_PANEL, payload: panel });
    }

    return (
        <MainContext.Provider value={{
            ...state,
            setEvent,
            setEvents,
            setProfile,
            setPanel
        }}>
            {children}
        </MainContext.Provider>
    );
}

export default Provider;