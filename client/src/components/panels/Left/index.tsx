import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Logo from 'components/buttons/Logo';
import NavButton from './Rows/Nav';
import LogoutButton from './Rows/Logout';
import { Panels } from 'utils/constants';

const styles = (theme: Theme) => createStyles({
  panel: {
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 0,
    height: '100%',
    width: 180,
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('sm')]: {
      width: 40
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  table: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: theme.spacing(1)
  },
  row: {
    height: theme.spacing(6),
    width: '100%'
  },
  button: {
    height: '100%',
    width: '100%',
    justifyContent: 'left',
    color: theme.palette.text.primary,
    fontSize: 20,
    [theme.breakpoints.down('sm')]: {
      width: 40,
      justifyContent: 'center',
      fontSize: 15
    }
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
    }
  },
  iconSize: {
    fontSize: 30,
  },
  labelContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
});

function LeftPanel({ classes }: WithStyles<typeof styles>) {
  return (
    <div className={classes.panel}>
      <div className={classes.row}>
        <Logo />
      </div>
      <div className={classes.table}>
        <div className={classes.row}>
          <NavButton
            styles={classes}
            panel={Panels.HOME}
          />
        </div>
        <div className={classes.row}>
          <NavButton
            styles={classes}
            panel={Panels.EXPLORE}
          />
        </div>
        <div className={classes.row}>
          <NavButton
            styles={classes}
            panel={Panels.PROFILE}
          />
        </div>
        <div className={classes.row}>
          <NavButton
            styles={classes}
            panel={Panels.SETTINGS}
          />
        </div>
        <div className={classes.row}>
          <NavButton
            styles={classes}
            panel={Panels.MORE}
          />
        </div>
        <div className={classes.row}>
          <LogoutButton styles={classes} />
        </div>
      </div>
    </div>
  );
}

export default memo(withStyles(styles)(LeftPanel), isEqual);