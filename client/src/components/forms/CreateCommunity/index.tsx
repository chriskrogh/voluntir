import type { WithStyles, Theme } from '@material-ui/core/styles';
import type { Community } from 'types/community';
import type { Dispatch, SetStateAction } from 'react';

import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Subtitle from 'components/typography/Subtitle';

const styles = (theme: Theme) => createStyles({
  container: {
    display: 'flex',
    margin: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  column: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  },
  qaPair: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(1)
  },
  input: {
    marginTop: theme.spacing(1),
  },
  textInput: {
    width: '100%'
  },
  dropZone: {
    width: '100%'
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
      <div className={classes.column}>
        <div className={classes.qaPair}>
          <Subtitle text="Name" align="center" />
          <TextField
            className={classnames(classes.input, classes.textInput)}
            variant="outlined"
            value={community.name}
            onChange={e => setCommunityField('name', e.target.value)}
          />
        </div>
        <div className={classes.qaPair}>
          <Subtitle text="Description" align="center" />
          <TextField
            className={classnames(classes.input, classes.textInput)}
            variant="outlined"
            value={community.description}
            onChange={e => setCommunityField('description', e.target.value)}
            multiline
          />
        </div>
      </div>
      <div className={classes.column}>
        <div className={classes.qaPair}>
          <Subtitle text="Profile Picture" align="center" />
        </div>
        <div className={classes.qaPair}>
          <Subtitle text="Banner" align="center" />
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(CreateCommunityForm);
