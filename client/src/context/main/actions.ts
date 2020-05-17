import { Event } from "types/event";
import { User } from "types/user";
import { Panels } from "utils/constants";

enum ActionTypes {
    SET_EVENTS = 'Set events',
    SET_EVENT = 'Set event',
    SET_PROFILE = 'Set profile',
    SET_PANEL = 'Set panel'
}

type SetEvent = {
    type: ActionTypes.SET_EVENT;
    payload: Event;
}

type SetEvents = {
    type: ActionTypes.SET_EVENTS;
    payload: Event[];
}

type SetProfile = {
    type: ActionTypes.SET_PROFILE;
    payload: User;
}

type SetPanel = {
    type: ActionTypes.SET_PANEL;
    payload: Panels;
}

export type Action = SetEvent
    | SetEvents
    | SetProfile
    | SetPanel;

export default ActionTypes;
