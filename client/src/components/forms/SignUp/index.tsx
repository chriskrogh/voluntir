import React, { useState } from 'react';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import /*type*/ { WithStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { TextField, Button, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import FacebookLogin from 'components/FacebookLogin';
import GoogleLogin from 'components/GoogleLogin';
import ParagraphText from 'components/typography/ParagraphText';
import { isValidEmail, isValidPassword, isEmpty } from 'utils/validator';

const containerWidth = 230;

const styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 400,
        backgroundColor: theme.palette.primary.main,
        borderRadius: 4
    },
    inputContainer: {
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
        width: containerWidth,
    },
    lastElement: {
        marginBottom: theme.spacing(3)
    },
    textColor: {
        color: theme.palette.text.primary,
    },
    textField: {
        width: containerWidth
    }
});

interface Props extends WithStyles<typeof styles> {
    theme: Theme
}

function SignUpForm({ classes, theme }: Props) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);

    return (
        <div className={classes.container}>
            <div className={classes.inputContainer}>
                <FacebookLogin mode="signup" />
            </div>
            <div className={classes.inputContainer}>
                <GoogleLogin mode="signup" />
            </div>
            <div className={classes.orContainer}>
                <ParagraphText text="OR" />
            </div>
            <div className={classes.orContainer}>
                <ParagraphText text="Sign up with email and password" />
            </div>
            <div className={classes.inputContainer}>
                <TextField
                    value={name}
                    label="Name"
                    onChange={e => setName(e.target.value)}
                    required
                    className={classes.textField}
                    type="text"
                />
            </div>
            <div className={classes.inputContainer}>
                <TextField
                    value={email}
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    required
                    className={classes.textField}
                    type="email"
                />
            </div>
            <div className={classes.inputContainer}>
                <TextField
                    value={password}
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                    className={classes.textField}
                    type="password"
                />
            </div>
            <div className={classes.inputContainer}>
                <TextField
                    value={cPassword}
                    label="Confirm Password"
                    onChange={e => setCPassword(e.target.value)}
                    required
                    className={classes.textField}
                    type="password"
                />
            </div>
            <div className={classes.buttonContainer}>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                size="small"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                                style={{ color: theme.palette.success.main }}
                            />
                        }
                        label="Remember me"
                        className={classes.textColor}
                    />
                </FormGroup>
            </div>
            <div className={classnames(classes.buttonContainer, classes.lastElement)}>
                <Button className={classes.textColor} >SIGN UP</Button>
            </div>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(SignUpForm);
