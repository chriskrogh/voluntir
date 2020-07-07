import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import /*type*/ { Community } from 'types/community';
import /*type*/ { Dispatch, SetStateAction } from 'react';

import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
  container: {
    margin: theme.spacing(2)
  }
});

interface Props extends WithStyles<typeof styles> {
  setCommunity: Dispatch<SetStateAction<Community>>;
}

function CreateCommunityForm({ classes, setCommunity }: Props) {
  return (
    <div className={classes.container}>
      hello
    </div>
  );
}

export default withStyles(styles)(CreateCommunityForm);
