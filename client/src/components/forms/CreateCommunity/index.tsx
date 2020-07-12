import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import /*type*/ { Community } from 'types/community';
import /*type*/ { Dispatch, SetStateAction } from 'react';

import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { TextField } from '@material-ui/core';
import Subtitle from 'components/typography/Subtitle';

const styles = (theme: Theme) => createStyles({
  container: {
    margin: theme.spacing(2)
  },
  qaPair: {
    margin: `${theme.spacing(1)}px 0`
  },
  input: {
    marginTop: theme.spacing(1),
    width: '40%',
    [theme.breakpoints.down('sm')]: {
      width: '90%'
    }
  }
});

interface Props extends WithStyles<typeof styles> {
  community: Community;
  setCommunity: Dispatch<SetStateAction<Community>>;
}

function CreateCommunityForm({ classes, community, setCommunity }: Props) {
  const setCommunityField = (field: string, value: string) => {
    setCommunity({
      ...community,
      [field]: value
    });
  }

  return (
    <div className={classes.container}>
      <div className={classes.qaPair}>
        <Subtitle text="Name" />
        <TextField
          className={classes.input}
          variant="outlined"
          value={community.name}
          onChange={e => setCommunityField('name', e.target.value)}
        />
      </div>
      <div className={classes.qaPair}>
        <Subtitle text="Description" />
        <TextField
          className={classes.input}
          variant="outlined"
          value={community.description}
          onChange={e => setCommunityField('description', e.target.value)}
          multiline
        />
      </div>
    </div>
  );
}

export default withStyles(styles)(CreateCommunityForm);
