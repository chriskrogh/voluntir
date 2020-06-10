import React, { ReactNode } from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const  styles = (theme: Theme) => createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: `48px ${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(1)
  },
})

interface Props extends WithStyles<typeof styles> {
  children?: ReactNode | ReactNode[];
  className?: string;
}

function Container({ classes, children, className }: Props) {
  return (
    <div className={classnames(classes.container, className)}>
      {children}
    </div>
  );
}

export default withStyles(styles)(Container);
