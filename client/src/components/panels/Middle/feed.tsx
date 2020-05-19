import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Event } from 'types/event';
import { Feeds } from 'utils/constants';
import events from 'data/events';
import Title from 'components/typography/Title';
import EventCard from 'components/EventCard';

const styles = (theme: Theme) => createStyles({
    feed: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: 600,
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.down('sm')]: {
            width: 440
        }
    },
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
        <div className={classes.feed}>
            <div className={classes.titleContainer}>
                <Title text={feed} />
            </div>
            <div className={classes.eventContainer}>
                {getEvents(feed).map((event, index) => (
                    <EventCard
                        key={event._id}
                        event={event}
                        className={index === 0 ? classes.firstChild : undefined}
                    />
                ))}
            </div>
        </div>
    );
}

export default withStyles(styles)(Feed);