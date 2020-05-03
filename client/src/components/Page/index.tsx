import React, { useContext, useEffect } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { UserContext } from 'context/user/state';
import Header from 'components/Header';
import Footer from 'components/Footer';
import * as routes from 'utils/routes';

const headerHeightDesktop = 60;
const headerHeightMobile = 40;
const footerHeightDesktop = 60;
const footerHeightMobile = 40;

const styles = (theme: Theme) => createStyles({
    page: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        minHeight: `calc(100vh - ${headerHeightDesktop}px - ${footerHeightDesktop}px)`,
        width: '100%',
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.down('sm')]: {
            minHeight: `calc(100vh - ${headerHeightMobile}px - ${footerHeightMobile}px)`,
        }
    },
    headerHeight: {
        height: 60,
        [theme.breakpoints.down('sm')]: {
            height: 40
        }
    },
    footerHeight: {
        height: 60,
        [theme.breakpoints.down('sm')]: {
            height: 40
        }
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
        <>
            <Header heightClassName={classes.headerHeight} />
            <div className={classes.page}>
                {children}
            </div>
            <Footer heightClassName={classes.footerHeight} />
        </>
    );
}

export default withStyles(styles, { withTheme: true })(Page);