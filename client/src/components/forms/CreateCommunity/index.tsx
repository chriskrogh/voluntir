import type { WithStyles, Theme } from '@material-ui/core/styles';
import type { Community } from 'types/community';
import type { Dispatch, SetStateAction } from 'react';

import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Subtitle from 'components/typography/Subtitle';
import DropZone from 'components/DropZone';

const styles = (theme: Theme) => createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2),
  },
  row: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  column: {
    alignItems: 'center',
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
          className={classnames(classes.input, classes.textInput)}
          variant="outlined"
          value={community.name}
          onChange={e => setCommunityField('name', e.target.value)}
        />
      </div>
      <div className={classes.qaPair}>
        <Subtitle text="Description" />
        <TextField
          className={classnames(classes.input, classes.textInput)}
          variant="outlined"
          value={community.description}
          onChange={e => setCommunityField('description', e.target.value)}
          multiline
        />
      </div>
      <div className={classes.row}>
        <div className={classnames(classes.qaPair, classes.column)}>
          <Subtitle text="Profile Picture" />
          <div className={classes.input}>
            <DropZone
              callback={(id: string) => console.log(id)}
              background={community.logo}
            />
          </div>
        </div>
        <div className={classnames(classes.qaPair, classes.column)}>
          <Subtitle text="Banner" />
          <div className={classes.input}>
            <DropZone
              callback={(id: string) => console.log(id)}
              background={community.banner}
            />
          </div>
        </div>
      </div>
      <div className={classes.qaPair}>
        <Subtitle text="Donate link" />
        <TextField
          className={classnames(classes.input, classes.textInput)}
          variant="outlined"
          value={community.donate}
          onChange={e => setCommunityField('description', e.target.value)}
          placeholder="https://paypal.com"
        />
      </div>
    </div>
  );
}

export default withStyles(styles)(CreateCommunityForm);
