import React, { useContext } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import /*type*/ { WithStyles } from '@material-ui/core/styles';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { UserContext } from 'context/user/state';
import { AuthMode, AuthRequest } from 'types/network';
import { User } from 'types/user';
import { GOOGLE_LOGIN } from 'utils/network/errorMessages';
import * as routes from 'utils/routes';
import { authenticate } from 'utils/network/auth';

const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;
const clientId = REACT_APP_GOOGLE_CLIENT_ID || '';

const containerWidth = 230;

const styles = createStyles({
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: containerWidth
    }
});

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
        const user = await authenticate(
            {
                ...res.profileObj,
                picture,
                fromThirdParty: true,
                mode: 'login',
                secret: res.accessToken
            } as AuthRequest,
            GOOGLE_LOGIN
        );
        callback(user);
    }
}

interface Props extends WithStyles<typeof styles> {
    mode: AuthMode;
}

const Google = ({ classes, mode }: Props) => {
    const { setUser } = useContext(UserContext);
    const history = useHistory();

    const callback = (user: User) => {
        setUser(user);
        localStorage.setItem('userId', user._id);
        history.push(routes.HOME);
    }

    return (
        <GoogleLogin
            clientId={clientId}
            onSuccess={(res: GoogleLoginResponse | GoogleLoginResponseOffline) => loginUser(res, callback)}
            onFailure={() => {
                throw new Error(GOOGLE_LOGIN);
            }}
            buttonText={`${mode === 'login' ? "Log in" : "Sign up"} with Google`}
            className={classes.button}
        />
    );
}

export default withStyles(styles)(Google);