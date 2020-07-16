import type { WithStyles, Theme } from '@material-ui/core/styles';
import type { Event } from 'types/event';

import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import EventCard from 'components/cards/EventCard';

const styles = (theme: Theme) => createStyles({
  eventContainer: {
    margin: `0 ${theme.spacing(2)}px`,
  },
  firstChild: {
    marginTop: 0
  }
});

interface Props extends WithStyles<typeof styles> {
  events: Event[];
}

function EventList({ classes, events }: Props) {
  return (
    <div className={classes.eventContainer}>
      {events.map((event, index) => (
        <EventCard
          key={event._id}
          event={event}
          className={index === 0 ? classes.firstChild : undefined}
        />
      ))}
    </div>
  );
}

export default withStyles(styles)(EventList);
