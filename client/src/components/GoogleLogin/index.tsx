import React, { useContext } from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { UserContext } from 'context/user/state';
import { Method, LoginRequest } from 'types/network';
import { User } from 'types/user';
import { makeRequest } from "network/request";
import { GOOGLE_LOGIN } from 'network/errorMessages';
import { USERS } from 'network/endpoints';
import * as routes from 'utils/routes';

const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;
const clientId = REACT_APP_GOOGLE_CLIENT_ID || '';

function isOffline(
    res: GoogleLoginResponse | GoogleLoginResponseOffline
): res is GoogleLoginResponseOffline {
    return (res as GoogleLoginResponseOffline).code !== undefined;
}

const loginUser = async (
    res: GoogleLoginResponse | GoogleLoginResponseOffline,
    callback: (user: User) => void
) => {
    if (isOffline(res) || res.profileObj == null) {
        throw new Error(GOOGLE_LOGIN);
    } else {
        const picture = res.profileObj.imageUrl;
        const user = await makeRequest<User, LoginRequest>(
            Method.POST,
            USERS,
            GOOGLE_LOGIN,
            { ...res.profileObj, picture, fromThirdParty: true } as LoginRequest
        );
        callback(user);
    }
}

const Google = () => {
    const { setUser } = useContext(UserContext);
    const history = useHistory();

    const callback = (user: User) => {
        setUser(user);
        history.push(routes.HOME);
    }

    return (
        <GoogleLogin
            clientId={clientId}
            autoLoad
            onSuccess={(res: GoogleLoginResponse | GoogleLoginResponseOffline) => loginUser(res, callback)}
            onFailure={() => {
                throw new Error(GOOGLE_LOGIN);
            }}
            buttonText="Log in with Google"
        />
    );
}

export default Google;