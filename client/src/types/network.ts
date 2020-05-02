import { UserData } from './user';

export enum Method {
    GET,
    POST,
    PATCH,
    DELETE
};

export type LoginRequest = UserData & {
    fromThirdParty: boolean;
};

export type AuthMode = 'login' | 'signup';
