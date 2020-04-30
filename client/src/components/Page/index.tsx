import React, { useContext, useEffect } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import /*type*/ { WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { useHistory } from 'react-router-dom';
import { UserContext } from 'context/user/state';
import * as routes from 'utils/routes';

const styles = (theme: Theme) => createStyles({
    page: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: theme.palette.background.default
    }
});

interface Props extends WithStyles<typeof styles> {
    theme: Theme
    children: JSX.Element | JSX.Element[]
}

function Page({ classes, children }: Props) {
    const { user } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (user._id === '0') {
            history.push(routes.AUTH);
        }
    }, [history, user._id])

    return (
        <div className={classes.page}>
            {children}
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(Page);