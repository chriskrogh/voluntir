import React, { useContext } from 'react';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import { useHistory } from 'react-router-dom';
import { UserContext } from 'context/user/state';
import { User, UserData } from 'types/user';
import { AuthMode } from 'types/network';
import { thirdPartyAuth } from 'utils/data/user';
import * as routes from 'utils/routes';
import Icon from './icon';
import './fb.css';

const { REACT_APP_FB_APP_ID } = process.env;
const appId = REACT_APP_FB_APP_ID || '';

const loginUser = async (
    res: ReactFacebookLoginInfo,
    callback: (user: User, token: string) => void
) => {
    if (res.name == null || res.email == null || res.picture == null) {
        throw new Error();
    } else {
        const picture = res.picture.data.url;
        const secret = res.email.split('@')[0];
        const { user, token } = await thirdPartyAuth({
            ...res,
            picture,
            secret
        } as UserData);
        callback(user, token);
    }
}

interface Props {
    mode: AuthMode;
}

const FB = ({ mode }: Props) => {
    const { setUser, setToken } = useContext(UserContext);
    const history = useHistory();

    const callback = (user: User, token: string) => {
        setUser(user);
        setToken(token);
        localStorage.setItem('token', token);
        history.push(routes.HOME);
    }

    return (
        <FacebookLogin
            appId={appId}
            fields="name,email,picture"
            callback={(res: ReactFacebookLoginInfo) => loginUser(res, callback)}
            cssClass="fb-button"
            icon={<Icon />}
            textButton={`${mode === 'login' ? "Log in" : "Sign up"} with Facebook`}
        />
    );
}

export default FB;