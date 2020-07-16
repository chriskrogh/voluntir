import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';

import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) => ({
  text: {
    color: theme.palette.error.main,
    margin: 0,
  }
});

interface Props extends WithStyles<typeof styles> {
  text: string;
}

function ErrorText({ classes, text }: Props) {
  return (
    <p className={classes.text}>
      {text}
    </p>
  );
}

export default withStyles(styles)(ErrorText);
