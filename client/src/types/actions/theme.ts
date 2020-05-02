import ACTION_TYPES from 'context/theme/actions';
import { Theme } from '@material-ui/core/styles';

type ActionTypeTuple = typeof ACTION_TYPES;

export type Action = {
    type: ActionTypeTuple[number];
    payload: Theme
};