import React from 'react';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import { Method, LoginRequest } from 'types/network';
import { User, UserData } from 'types/user';
import { makeRequest } from "network/request";
import { FACEBOOK_LOGIN } from 'network/errorMessages';
import { USERS } from 'network/endpoints';
import './fb.css';

const { REACT_APP_FB_APP_ID } = process.env;
const appId = REACT_APP_FB_APP_ID || '';

const loginUser = async (res: ReactFacebookLoginInfo) => {
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
        console.log(user);
    }
}

const FB = () => {
    return (
        <FacebookLogin
            appId={appId}
            autoLoad={true}
            fields="name,email,picture"
            callback={(res: ReactFacebookLoginInfo) => loginUser(res)}
            cssClass="fb-button"
        />
    );
}

export default FB;