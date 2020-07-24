import type { Theme, WithStyles } from '@material-ui/core/styles';

import React, { useContext, memo } from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import isEqual from 'react-fast-compare';
import { useHistory } from 'react-router-dom';
import { UserContext } from 'context/user/state';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ParagraphText from 'components/typography/ParagraphText';
import { logout } from 'utils/api/user';
import { Routes } from 'utils/constants';

const styles = (theme: Theme) => createStyles({
  button: {
    height: '100%',
    width: '100%',
    justifyContent: 'left',
    color: theme.palette.text.primary
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(1),
    }
  },
  iconSize: {
    fontSize: 30,
    [theme.breakpoints.down('sm')]: {
      fontSize: 24
    }
  },
  labelContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

function LogoutButton({ classes }: WithStyles<typeof styles>) {
  const { token, unsetUser, unsetToken } = useContext(UserContext);
  const history = useHistory();

  const signOut = async () => {
    try {
      unsetUser();
      await logout(token);
      unsetToken();
      localStorage.removeItem('token');
      history.push(Routes.AUTH);
    } catch (error) {
      // TODO replace with helpful message 2 user
      console.error(error);
    }
  }

  return (
    <Button  className={classes.button}onClick={signOut}>
      <div className={classes.iconContainer}>
        <ExitToAppIcon  className={classes.iconSize}/>
      </div>
      <div className={classes.labelContainer}>
        <ParagraphText text="Sign Out" />
      </div>
    </Button>
  );
}

export default memo(withStyles(styles)(LogoutButton), isEqual);
