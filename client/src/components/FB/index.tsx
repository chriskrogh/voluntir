import React, { useContext } from 'react';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import { UserContext } from 'context/user/state';
import { Method, LoginRequest } from 'types/network';
import { User } from 'types/user';
import { makeRequest } from "network/request";
import { FACEBOOK_LOGIN } from 'network/errorMessages';
import { USERS } from 'network/endpoints';
import './fb.css';

const { REACT_APP_FB_APP_ID } = process.env;
const appId = REACT_APP_FB_APP_ID || '';

const loginUser = async (res: ReactFacebookLoginInfo, setUser: (user: User) => void) => {
    if (res.name === undefined || res.email === undefined || res.picture === undefined) {
        throw new Error(FACEBOOK_LOGIN);
    } else {
        const picture = res.picture.data.url;
        const user = await makeRequest<User, LoginRequest>(
            Method.POST,
            USERS,
            FACEBOOK_LOGIN,
            { ...res, picture, fromThirdParty: true } as LoginRequest
        );
        setUser(user);
    }
}

const FB = () => {
    const { setUser } = useContext(UserContext);

    return (
        <FacebookLogin
            appId={appId}
            autoLoad={true}
            fields="name,email,picture"
            callback={(res: ReactFacebookLoginInfo) => loginUser(res, setUser)}
            cssClass="fb-button"
        />
    );
}

export default FB;