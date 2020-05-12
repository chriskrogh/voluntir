import React, { useContext, useEffect } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { getUser } from 'utils/data/user';
import { useHistory, useLocation } from 'react-router-dom';
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
    theme: Theme;
    children: React.ReactNode;
}

function Page({ classes, children }: Props) {
    const { user, token, setUser } = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        async function fetchUser() {
            if (user._id === '0' && location.pathname !== routes.AUTH) {
                if (token !== '') {
                    const user = await getUser(token);
                    setUser(user);
                } else {
                    history.push(routes.AUTH);
                }
            }
        }
        fetchUser();
        // eslint-disable-next-line
    }, [])

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