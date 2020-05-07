import ACTION_TYPES from 'context/theme/actions';
import { NamedTheme } from 'types/theme';

type ActionTypeTuple = typeof ACTION_TYPES;

export type Action = {
    type: ActionTypeTuple[number];
    payload: NamedTheme;
};