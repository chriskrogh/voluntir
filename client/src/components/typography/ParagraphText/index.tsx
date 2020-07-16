import type { WithStyles, Theme } from '@material-ui/core/styles';

import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const styles = (theme: Theme) => createStyles({
  text: {
    fontSize: 16,
    color: theme.palette.text.primary,
    margin: 0,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14
    }
  },
  underline: {
    textDecoration: 'underline'
  }
});

interface Props extends WithStyles<typeof styles> {
  text: string;
  color?: string;
  underline?: boolean;
}

function ParagraphText({ classes, color, text, underline }: Props) {
  return (
    <p
      className={classnames(
        classes.text,
        { [classes.underline]: underline }
      )}
      style={{ color }}
    >
      {text}
    </p>
  );
}

export default withStyles(styles)(ParagraphText);
