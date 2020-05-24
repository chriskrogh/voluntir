import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import /*type*/ { History } from 'history';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import useQuery from 'utils/hooks/useQuery';
import communities from 'data/communities';
import M from 'utils/errorMessages';
import { Routes } from 'utils/constants';

const styles = (theme: Theme) => createStyles({
  panel: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: 600,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('sm')]: {
      width: 440
    }
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: `48px ${theme.spacing(2)}px 0 ${theme.spacing(2)}px`,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(1)
  }
});

const getCommnity = (id: string | null, history: History) => {
  if (id == null) {
    console.error(M.COMMUNITY_PAGE_ID);
    history.push(Routes.HOME)
    return communities[0];
  } else {
    return communities[parseInt(id)];
  }
}

function CommunityPanel({ classes }: WithStyles<typeof styles>) {
  const history = useHistory();

  const id = useQuery().get('id');
  const community = getCommnity(id, history);

  return (
    <div className={classes.panel}>
      <div className={classes.container}>
        {community.name}
      </div>
    </div>
  );
}

export default withStyles(styles)(CommunityPanel);