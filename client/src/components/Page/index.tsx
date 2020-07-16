import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';

import React, { useContext, useEffect } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { getUser } from 'utils/api/user';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from 'context/user/state';
import { Routes } from 'utils/constants';

const styles = (theme: Theme) => createStyles({
  page: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
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
      if (user._id === '0' && location.pathname !== Routes.AUTH) {
        if (token !== '') {
          const user = await getUser(token);
          setUser(user);
        } else {
          history.push(Routes.AUTH);
        }
      }
    }
    fetchUser();
    // eslint-disable-next-line
    }, [])

  return (
    <>
      <div className={classes.page}>
        {children}
      </div>
    </>
  );
}

export default withStyles(styles, { withTheme: true })(Page);
