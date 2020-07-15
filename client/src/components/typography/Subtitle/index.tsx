import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextAlign } from 'types/theme';

const styles = (theme: Theme) => ({
  text: {
    color: theme.palette.text.secondary,
    margin: 0,
  }
});

interface Props extends WithStyles<typeof styles> {
  text: string;
  color?: string;
  align?: TextAlign;
}

function Subtitle({ classes, text, color, align = 'left' }: Props) {
  return (
    <h3
      className={classes.text}
      style={{ color, textAlign: align }}
    >
      {text}
    </h3>
  );
}

export default withStyles(styles)(Subtitle);
