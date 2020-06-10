import React, { useContext, memo } from 'react';
import isEqual from 'react-fast-compare';
import { LeftPanelRowStyles } from 'types/leftPanelRow';
import { useHistory } from 'react-router-dom';
import { UserContext } from 'context/user/state';
import { logout } from 'utils/api/user';
import { Button } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Routes } from 'utils/constants';

interface Props {
  styles: LeftPanelRowStyles;
}

function LogoutButton({ styles }: Props) {
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
    <Button className={styles.button} onClick={signOut}>
      <div className={styles.iconContainer}>
        <ExitToAppIcon className={styles.icon} />
      </div>
      <div className={styles.labelContainer}>
        Sign out
      </div>
    </Button>
  );
}

export default memo(LogoutButton, isEqual);
