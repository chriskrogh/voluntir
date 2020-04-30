import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { ButtonGroup, Button } from '@material-ui/core';
import Page from 'components/Page';
import Title from 'components/typography/Title';
import Subtitle from 'components/typography/Subtitle';

const styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonGroup: {
        backgroundColor: theme.palette.primary.main
    },
    button: {
        color: theme.palette.text.primary
    }
});

interface Props extends WithStyles<typeof styles> {
}

function Auth({ classes }: Props) {
    return (
        <Page>
            <div className={classes.container}>
                <Title text="Welcome to Community" />
                <Subtitle text="Ready to help?" />
                <ButtonGroup className={classes.buttonGroup}>
                    <Button className={classes.button}>LOGIN</Button>
                    <Button className={classes.button}>SIGNUP</Button>
                </ButtonGroup>
            </div>
        </Page>
    );
}

export default withStyles(styles)(Auth);