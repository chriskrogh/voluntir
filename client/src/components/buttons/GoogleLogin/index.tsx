import type { WithStyles } from '@material-ui/core/styles';
import type { AuthMode } from 'types/network';

import React, { useContext } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { UserContext } from 'context/user/state';
import { User, UserData } from 'types/user';
import { Routes } from 'utils/constants';
import { thirdPartyAuth } from 'utils/api/user';

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
  callback: (user: User, token: string) => void
) => {
  if (isOffline(res) || res.profileObj == null) {
    throw new Error();
  } else {
    const picture = res.profileObj.imageUrl;
    const secret = res.profileObj.email.split('@')[0];
    const { user, token } = await thirdPartyAuth({
      ...res.profileObj,
      picture,
      secret
    } as UserData);
    callback(user, token);
  }
}

interface Props extends WithStyles<typeof styles> {
  mode: AuthMode;
}

const Google = ({ classes, mode }: Props) => {
  const { setUser, setToken } = useContext(UserContext);
  const history = useHistory();

  const callback = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem('token', token);
    history.push(Routes.HOME);
  }

  return (
    <GoogleLogin
      clientId={clientId}
      onSuccess={
        (res: GoogleLoginResponse | GoogleLoginResponseOffline) =>
          loginUser(res, callback)
      }
      onFailure={() => {
        throw new Error();
      }}
      buttonText={`${mode === 'login' ? "Log in" : "Sign up"} with Google`}
      className={classes.button}
    />
  );
}

export default withStyles(styles)(Google);
