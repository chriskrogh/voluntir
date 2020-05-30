import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Event } from 'types/event';
import { Feeds } from 'utils/constants';
import Panel from './common/Panel';
import Title from 'components/typography/Title';
import EventList from 'components/lists/EventList';
import events from 'data/events';

const styles = (theme: Theme) => createStyles({
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    height: 48,
    margin: `0 ${theme.spacing(3)}px`,
  },
  eventContainer: {
    margin: `0 ${theme.spacing(2)}px`,
  },
  firstChild: {
    marginTop: 0
  }
});

const getEvents = (feed: Feeds): Event[] => {
  // replace with api calls
  switch (feed) {
    case Feeds.HOME:
      return [events[1], events[2]]
    case Feeds.EXPLORE:
      return events;
    default:
      return [];
  }
}

interface Props extends WithStyles<typeof styles> {
  feed: Feeds;
}

function Feed({ classes, feed }: Props) {
  return (
    <Panel>
      <div className={classes.titleContainer}>
        <Title text={feed} />
      </div>
      <EventList events={getEvents(feed)}/>
    </Panel>
  );
}

export default withStyles(styles)(Feed);