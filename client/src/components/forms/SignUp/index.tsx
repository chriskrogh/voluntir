import React, { useState } from 'react';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import /*type*/ { WithStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { TextField, Button } from '@material-ui/core';
import FacebookLogin from 'components/FacebookLogin';
import GoogleLogin from 'components/GoogleLogin';
import ParagraphText from 'components/typography/ParagraphText';

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
        marginTop: theme.spacing(3),
        width: containerWidth,
    },
    button: {
        color: theme.palette.text.primary,
    },
    textField: {
        width: containerWidth
    },
    lastElement: {
        marginBottom: theme.spacing(3)
    }
});

interface Props extends WithStyles<typeof styles> { }

function SignUpForm({ classes }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');

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
            <div className={classnames(classes.buttonContainer, classes.lastElement)}>
                <Button className={classes.button} >SIGN UP</Button>
            </div>
        </div>
    );
}

export default withStyles(styles)(SignUpForm);
