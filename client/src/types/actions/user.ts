import ACTION_TYPES from 'context/user/actions';
import { User } from 'types/user';

type ActionTypeTuple = typeof ACTION_TYPES;

export type Action = {
    type: ActionTypeTuple[number];
    payload: User;
};