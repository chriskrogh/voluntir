import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import { Event } from 'types/event';
import events from 'data/events';
import ParagraphText from 'components/typography/ParagraphText';
import Subtitle from 'components/typography/Subtitle';
import { Routes } from 'utils/constants';

const styles = (theme: Theme) => createStyles({
  panel: {
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 48,
    height: '100%',
    justifyContent: 'center',
    width: 180,
    [theme.breakpoints.down('sm')]: {
      width: 120
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
    padding: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    borderRadius: theme.spacing(1),
  },
  pointer: {
    cursor: 'pointer',
  },
  row: {
    marginTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.text.secondary}`
  }
});

const getUpcomingEvents = (): Event[] => {
  return events;
}

function RightPanel({ classes }: WithStyles<typeof styles>) {
  const history = useHistory();

  const goToEvent = (id: string) => {
    history.push(Routes.EVENT + '?id=' + id);
  }

  return (
    <div className={classes.panel}>
      <div className={classes.row}>
        <Subtitle text="Upcoming" />
      </div>
      {getUpcomingEvents().map((event) => (
        <div
          key={event._id}
          onClick={() => goToEvent(event._id)}
          className={classnames(classes.row, classes.pointer)}
        >
          <ParagraphText text={event.title} />
        </div>
      ))}
    </div>
  );
}

export default withStyles(styles)(RightPanel);