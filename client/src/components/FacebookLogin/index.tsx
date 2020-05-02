import React, { useContext } from 'react';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import { useHistory } from 'react-router-dom';
import { UserContext } from 'context/user/state';
import { Method, LoginRequest, AuthMode } from 'types/network';
import { User } from 'types/user';
import { makeRequest } from "network/request";
import { FACEBOOK_LOGIN } from 'network/errorMessages';
import { USERS } from 'network/endpoints';
import * as routes from 'utils/routes';
import Icon from './icon';
import './fb.css';

const { REACT_APP_FB_APP_ID } = process.env;
const appId = REACT_APP_FB_APP_ID || '';

const loginUser = async (res: ReactFacebookLoginInfo, callback: (user: User) => void) => {
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
        callback(user);
    }
}

interface Props {
    mode: AuthMode
}

const FB = ({ mode }: Props) => {
    const { setUser } = useContext(UserContext);
    const history = useHistory();

    const callback = (user: User) => {
        setUser(user);
        history.push(routes.HOME);
    }

    return (
        <FacebookLogin
            appId={appId}
            autoLoad={true}
            fields="name,email,picture"
            callback={(res: ReactFacebookLoginInfo) => loginUser(res, callback)}
            cssClass="fb-button"
            icon={<Icon />}
            textButton={`${mode === 'login' ? "Log in" : "Sign up"} with Facebook`}
        />
    );
}

export default FB;