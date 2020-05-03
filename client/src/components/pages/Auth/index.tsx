import React, { useState } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { ButtonGroup, Button } from '@material-ui/core';
import Page from 'components/Page';
import Title from 'components/typography/Title';
import Subtitle from 'components/typography/Subtitle';
import LoginForm from 'components/forms/Login';
import SignUpForm from 'components/forms/SignUp';

const styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        marginTop: theme.spacing(2),
    },
    subtitleContainer: {
        marginTop: theme.spacing(3),
    },
    buttonGroup: {
        backgroundColor: theme.palette.background.default,
        marginTop: theme.spacing(3),
    },
    button: {
        color: theme.palette.text.primary,
        borderColor: theme.palette.text.secondary,
        width: 200
    },
    formContainer: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    }
});

interface Props extends WithStyles<typeof styles> { }

function Auth({ classes }: Props) {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <Page>
            <div className={classes.container}>
                <div className={classes.titleContainer}>
                    <Title text="Welcome to Community" />
                </div>
                <div className={classes.subtitleContainer}>
                    <Subtitle text="Ready to help?" />
                </div>
                <ButtonGroup className={classes.buttonGroup}>
                    <Button
                        className={classes.button}
                        onClick={() => setIsLogin(true)}
                    >
                        LOG IN
                    </Button>
                    <Button
                        className={classes.button}
                        onClick={() => setIsLogin(false)}
                    >
                        SIGN UP
                    </Button>
                </ButtonGroup>
                <div className={classes.formContainer}>
                    {isLogin ? <LoginForm /> : <SignUpForm />}
                </div>
            </div>
        </Page>
    );
}

export default withStyles(styles)(Auth);