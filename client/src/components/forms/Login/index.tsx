import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';

import React, { useState, useContext } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { UserContext } from 'context/user/state';
import { useHistory } from 'react-router-dom';
import {
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress
} from '@material-ui/core';
import FacebookLogin from 'components/buttons/FacebookLogin';
import GoogleLogin from 'components/buttons/GoogleLogin';
import ParagraphText from 'components/typography/ParagraphText';
import ErrorText from 'components/typography/ErrorText';
import { isValidEmail, isValidPassword } from 'utils/validator';
import { login } from 'utils/api/user';
import { Routes } from 'utils/constants';

const innerContainerWidth = 230;

const styles = (theme: Theme) => createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 400,
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(1)
  },
  topSpacing: {
    marginTop: theme.spacing(3)
  },
  orContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2)
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    width: innerContainerWidth,
  },
  lastElement: {
    marginBottom: theme.spacing(3)
  },
  textColor: {
    color: theme.palette.text.primary,
  },
  textField: {
    width: innerContainerWidth,
  },
  errorList: {
    color: theme.palette.error.main,
    width: innerContainerWidth,
    marginTop: theme.spacing(2)
  },
  activityIndicator: {
    color: theme.palette.text.primary
  }
});

const validate = (
  email: string,
  password: string,
) => {
  return (
    isValidEmail(email)
        && isValidPassword(password)
  );
}

const authenticate = async (email: string, password: string) => {
  if (validate(email, password)) {
    return await login({ email, secret: password });
  } else {
    throw new Error();
  }
}

interface Props extends WithStyles<typeof styles> {
  theme: Theme;
}

function LoginForm({ classes, theme }: Props) {
  const { setUser, setToken } = useContext(UserContext);
  const history = useHistory();

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ rememberMe, setRememberMe ] = useState(true);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ submitted, setSubmitted ] = useState(false);
  const [ invalidRequest, setInvalidRequest ] = useState(false);

  const helpEmail = () => {
    return !isValidEmail(email);
  }

  const helpPassword = () => {
    return !isValidPassword(password);
  }

  const submit = async () => {
    setIsLoading(true);
    setSubmitted(true);
    try {
      const { user, token } = await authenticate(email, password);
      if (user && token) {
        setUser(user);
        setToken(token);
        if (rememberMe) {
          localStorage.setItem('token', token);
        }
        history.push(Routes.HOME);
      } else throw new Error();
    } catch (error) {
      setInvalidRequest(true);
      setIsLoading(false);
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.topSpacing}>
        <FacebookLogin mode="login" />
      </div>
      <div className={classes.topSpacing}>
        <GoogleLogin mode="login" />
      </div>
      <div className={classes.orContainer}>
        <ParagraphText text="OR" />
      </div>
      <div className={classes.orContainer}>
        <ParagraphText text="Log in with email and password" />
      </div>
      {submitted && (
        <ul className={classes.errorList} >
          {!isValidEmail(email) && (
            <li>
              <ErrorText text="Invalid email" />
            </li>
          )}
          {!isValidPassword(password) && (
            <li>
              <ErrorText text="Passwords must be at least 6 characters long" />
            </li>
          )}
          {invalidRequest && (
            <li>
              <ErrorText text="Incorrect email or password" />
            </li>
          )}
        </ul>
      )}
      <div className={classes.topSpacing}>
        <TextField
          variant="outlined"
          value={email}
          label="Email"
          onChange={e => setEmail(e.target.value)}
          required
          className={classes.textField}
          type="email"
          error={helpEmail()}
          helperText={
            helpEmail()
              ? 'Enter a valid email address (example@gmail.com)'
              : ''
          }
        />
      </div>
      <div className={classes.topSpacing}>
        <TextField
          variant="outlined"
          value={password}
          label="Password"
          onChange={e => setPassword(e.target.value)}
          required
          className={classes.textField}
          type="password"
          error={helpPassword()}
          helperText={
            helpPassword()
              ? 'Password must be at least 6 characters'
              : ''
          }
        />
      </div>
      <div className={classes.buttonContainer}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size='small'
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                style={{ color: theme.palette.success.main }}
              />
            }
            label='Remember me'
            className={classes.textColor}
          />
        </FormGroup>
      </div>
      <div
        className={
          classnames(classes.buttonContainer, !isLoading && classes.lastElement)
        }
      >
        <Button
          className={classes.textColor}
          onClick={submit}
          disabled={isLoading}
        >
                    LOG IN
        </Button>
      </div>
      {isLoading && (
        <div
          className={classes.lastElement}
          style={{ marginTop: theme.spacing(2) }}
        >
          <CircularProgress className={classes.activityIndicator} />
        </div>
      )}
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(LoginForm);
