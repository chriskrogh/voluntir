import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Event } from 'types/event';
import { Panels } from 'utils/constants';
import events from 'data/events';
import Title from 'components/typography/Title';
import EventCard from 'components/EventCard';

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

const getEvents = (panel: Panels): Event[] => {
    switch (panel) {
        case Panels.HOME:
            return [events[1], events[2]]
        case Panels.EXPLORE:
            return events;
        default:
            return [];
    }
}

interface Props extends WithStyles<typeof styles> {
    panel: Panels;
}

function Feed({ classes, panel }: Props) {
    return (
        <>
            <div className={classes.titleContainer}>
                <Title text={panel} />
            </div>
            <div className={classes.eventContainer}>
                {getEvents(panel).map((event, index) => (
                    <EventCard
                        key={event._id}
                        event={event}
                        className={index === 0 ? classes.firstChild : undefined}
                    />
                ))}
            </div>
        </>
    );
}

export default withStyles(styles)(Feed);