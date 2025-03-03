import type { WithStyles, Theme } from '@material-ui/core/styles';

import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Logo from 'components/buttons/Logo';
import NavButton from './Nav';
import { rows } from './constants';
import { Panels } from 'utils/constants';

const styles = (theme: Theme) => createStyles({
  panel: {
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 0,
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
    height: '100%',
    width: 180,
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
        {rows.map((row: Panels) => (
          <div className={classes.row} key={row}>
            <NavButton
              styles={classes}
              panel={row}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(withStyles(styles)(LeftPanel), isEqual);
