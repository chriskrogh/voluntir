import { User } from "types/user";
import { makeRequest } from "utils/network/request";
import { Method, AuthRequest } from "types/network";
import { USERS } from "utils/network/endpoints";
import * as M from './errorMessages';

export const authenticate = async (req: AuthRequest, errorMessage: string) => {
    const user = await makeRequest<User, AuthRequest>(
        Method.POST,
        USERS + (req.mode === 'login' ? '' : '/signup'),
        errorMessage,
        req
    );
    return user;
}

export const getUserById = async (id: string) => {
    const user = await makeRequest<User>(
        Method.GET,
        USERS + '/me?id=' + id,
        M.FETCH_USER
    );
    return user;
}
