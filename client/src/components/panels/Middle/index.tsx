import React, { ReactNode } from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';

const  styles = (theme: Theme) => createStyles({
  panel: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: 600,
    backgroundColor: theme.palette.background.default,
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