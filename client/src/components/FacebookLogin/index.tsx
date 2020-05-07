import React, { useContext } from 'react';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import { useHistory } from 'react-router-dom';
import { UserContext } from 'context/user/state';
import { AuthMode, AuthRequest } from 'types/network';
import { authenticate } from 'utils/network/auth';
import { User } from 'types/user';
import { FACEBOOK_LOGIN } from 'utils/network/errorMessages';
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
        const user = await authenticate(
            {
                ...res,
                picture,
                fromThirdParty: true,
                mode: 'login',
                secret: res.accessToken
            } as AuthRequest,
            FACEBOOK_LOGIN
        );
        callback(user);
    }
}

interface Props {
    mode: AuthMode;
}

const FB = ({ mode }: Props) => {
    const { setUser } = useContext(UserContext);
    const history = useHistory();

    const callback = (user: User) => {
        setUser(user);
        localStorage.setItem('userId', user._id);
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