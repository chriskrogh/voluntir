import React, { useState, useContext } from 'react';
import /*type*/ { WithStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import { UserContext } from 'context/user/state';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
    TextField,
    Button,
    FormGroup,
    FormControlLabel,
    Checkbox,
    CircularProgress
} from '@material-ui/core';
import FacebookLogin from 'components/FacebookLogin';
import GoogleLogin from 'components/GoogleLogin';
import ParagraphText from 'components/typography/ParagraphText';
import ErrorText from 'components/typography/ErrorText';
import { isValidEmail, isValidPassword, isEmpty } from 'utils/validator';
import * as routes from 'utils/routes';
import { signup } from 'utils/data/user';

const innerContainerWidth = 230;

const styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 400,
        backgroundColor: theme.palette.primary.main,
        borderRadius: 4
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
    name: string,
    email: string,
    password: string,
    cPassword: string
) => {
    return (
        !isEmpty(name)
        && isValidEmail(email)
        && isValidPassword(password)
        && (password === cPassword)
    );
}

const authenticate = async (
    name: string,
    email: string,
    password: string,
    cPassword: string,
) => {
    if (validate(name, email, password, cPassword)) {
        return await signup({ name, email, secret: password });
    } else {
        throw new Error();
    }
}

interface Props extends WithStyles<typeof styles> {
    theme: Theme;
}

function SignUpForm({ classes, theme }: Props) {
    const { setUser, setToken } = useContext(UserContext);
    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [invalidRequest, setInvalidRequest] = useState(false);

    const helpEmail = () => {
        return !isValidEmail(email);
    }

    const helpPassword = () => {
        return !isValidPassword(password);
    }

    const helpCPassword = () => {
        return !(cPassword === password);
    }

    const submit = async () => {
        setIsLoading(true);
        setSubmitted(true);
        try {
            const { user, token } = await authenticate(name, email, password, cPassword);
            if (user && token) {
                setUser(user);
                setToken(token);
                if (rememberMe) {
                    localStorage.setItem('token', token);
                }
                history.push(routes.HOME);
            } else throw new Error();
        } catch (error) {
            setInvalidRequest(true);
            setIsLoading(false);
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.topSpacing}>
                <FacebookLogin mode='signup' />
            </div>
            <div className={classes.topSpacing}>
                <GoogleLogin mode='signup' />
            </div>
            <div className={classes.orContainer}>
                <ParagraphText text='OR' />
            </div>
            <div className={classes.orContainer}>
                <ParagraphText text='Sign up with email and password' />
            </div>
            {submitted && (
                <ul className={classes.errorList} >
                    {isEmpty(name) && (
                        <li>
                            <ErrorText text="Name cannot be empty" />
                        </li>
                    )}
                    {!isValidEmail(email) && (
                        <li>
                            <ErrorText text="Invalid email" />
                        </li>
                    )}
                    {(!isValidPassword(password) || password !== cPassword) && (
                        <li>
                            {/* eslint-disable-next-line max-len */}
                            <ErrorText text="Passwords must be at least 6 characters long and must match" />
                        </li>
                    )}
                    {invalidRequest && (
                        <li>
                            <ErrorText text="A user with this email already esists" />
                        </li>
                    )}
                </ul>
            )}
            <div className={classes.topSpacing}>
                <TextField
                    value={name}
                    label='Name'
                    onChange={e => setName(e.target.value)}
                    required
                    className={classes.textField}
                    type='text'
                />
            </div>
            <div className={classes.topSpacing}>
                <TextField
                    value={email}
                    label='Email'
                    onChange={e => setEmail(e.target.value)}
                    required
                    className={classes.textField}
                    type='email'
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
                    value={password}
                    label='Password'
                    onChange={e => setPassword(e.target.value)}
                    required
                    className={classes.textField}
                    type='password'
                    error={helpPassword()}
                    helperText={
                        helpPassword() ? 'Password must be at least 6 characters' : ''
                    }
                />
            </div>
            <div className={classes.topSpacing}>
                <TextField
                    value={cPassword}
                    label='Confirm Password'
                    onChange={e => setCPassword(e.target.value)}
                    required
                    className={classes.textField}
                    type='password'
                    error={helpCPassword()}
                    helperText={helpCPassword() ? 'Passwords must match' : ''}
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
            <div className={
                classnames(classes.buttonContainer, !isLoading && classes.lastElement)
            }>
                <Button
                    className={classes.textColor}
                    onClick={submit}
                >
                    SIGN UP
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

export default withStyles(styles, { withTheme: true })(SignUpForm);
