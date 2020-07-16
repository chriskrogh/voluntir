import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';

import React, { ReactNode } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';

const  styles = (theme: Theme) => createStyles({
  panel: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(3),
    height: '100%',
    backgroundColor: theme.palette.background.default,
    width: 860,
    [theme.breakpoints.down('md')]: {
      width: 600,
    },
    [theme.breakpoints.down('sm')]: {
      width: 440
    }
  }
})

interface Props extends WithStyles<typeof styles> {
  children?: ReactNode | ReactNode[];
}

function Panel({ classes, children }: Props) {
  return (
    <div className={classes.panel}>
      {children}
    </div>
  );
}

export default withStyles(styles)(Panel);
