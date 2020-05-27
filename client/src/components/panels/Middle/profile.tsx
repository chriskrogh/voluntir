import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import /*type*/ { History } from 'history';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Panel from '.';
import BannerPicture from 'components/BannerPicture';
import Title from 'components/typography/Title';
import EventList from 'components/lists/EventList';
import users from 'data/users';
import events from 'data/events';
import { Routes, Panels } from 'utils/constants';
import M from 'utils/errorMessages';
import useQuery from 'utils/hooks/useQuery';

const styles = (theme: Theme) => createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: `48px ${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(1)
  },
  nameContainer: {
    marginBottom: theme.spacing(1)
  },
  middleContainer: {
    margin: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px`,
  },
});

const getUser = (id: string | null, history: History) => {
  if (id == null) {
    console.warn(M.PROFILE_PAGE_ID);
    history.push(Routes.HOME);
    return users[0];
  } else {
    // replace with api call
    return users[parseInt(id)];
  }
}

const getCompletedEvents = () => {
  // replace with special request to server
  return [events[0], events[1]];
}

function ProfilePanel({ classes }: WithStyles<typeof styles>) {
  const history = useHistory();
  const id = useQuery().get('id');
  const user = getUser(id, history);

  const { picture, banner, name } = user;

  return (
    <Panel>
      <div className={classes.container}>
        <BannerPicture
          banner={banner}
          picture={picture}
          panel={Panels.PROFILE}
        />
        <div className={classes.nameContainer}>
          <Title text={name} />
        </div>
      </div>
      <EventList events={getCompletedEvents()} />
    </Panel>
  );
}

export default withStyles(styles)(ProfilePanel);