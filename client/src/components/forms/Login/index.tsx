import React, { useState } from 'react';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import /*type*/ { WithStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { TextField } from '@material-ui/core';
import FacebookLogin from 'components/FacebookLogin';
import GoogleLogin from 'components/GoogleLogin';
import ParagraphText from 'components/typography/ParagraphText';

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
    lastElement: {
        marginBottom: theme.spacing(3)
    }
});

interface Props extends WithStyles<typeof styles> { }

function LoginForm({ classes }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className={classes.container}>
            <div className={classes.inputContainer}>
                <FacebookLogin />
            </div>
            <div className={classes.inputContainer}>
                <GoogleLogin />
            </div>
            <div className={classes.orContainer}>
                <ParagraphText text="OR" />
            </div>
            <div className={classes.orContainer}>
                <ParagraphText text="Log in with email and password" />
            </div>
            <div className={classes.inputContainer}>
                <TextField
                    value={email}
                    label="Email"
                    placeholder="a@b.com"
                    onChange={e => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className={classnames(classes.inputContainer, classes.lastElement)}>
                <TextField
                    value={password}
                    label="Password"
                    placeholder="password"
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </div>
        </div>
    );
}

export default withStyles(styles)(LoginForm);