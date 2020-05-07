import { UserData } from './user';

export enum Method {
    GET,
    POST,
    PATCH,
    DELETE
}

export type AuthMode = 'login' | 'signup';

export type AuthRequest = UserData & {
    name?: string;
    fromThirdParty: boolean;
    mode: AuthMode;
};
