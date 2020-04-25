import React from 'react';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import { makeRequest } from "utils/request";
import { Method } from 'types/network';
import { UserData } from 'types/user';
import { FACEBOOK_LOGIN } from 'common/errorMessages';
import './fb.css';

const { REACT_APP_FB_APP_ID } = process.env;
const appId = REACT_APP_FB_APP_ID || '';

const loginUser = async (res: ReactFacebookLoginInfo) => {
    if (res.name === undefined || res.email === undefined) {
        throw Error();
    } else {
        const pictureUrl = res.picture?.data.url;
        await makeRequest<UserData>(
            Method.POST,
            '/api/users',
            FACEBOOK_LOGIN,
            { ...res, pictureUrl } as UserData
        );
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