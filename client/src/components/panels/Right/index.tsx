import React, { useContext } from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { MainContext } from 'context/main/state';
import { Event } from 'types/event';
import events from 'data/events';
import ParagraphText from 'components/typography/ParagraphText';
import { Panels } from 'utils/constants';
import Subtitle from 'components/typography/Subtitle';

const styles = (theme: Theme) => createStyles({
    panel: {
        display: 'flex',
        flexDirection: 'column',
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
        marginTop: 48,
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
    const { setEvent, setPanel } = useContext(MainContext);

    const goToEvent = (event: Event) => {
        setEvent(event);
        setPanel(Panels.EVENT);
    }

    return (
        <div className={classes.panel}>
            <div className={classes.row}>
                <Subtitle text="Upcoming" />
            </div>
            {getUpcomingEvents().map((event) => (
                <div
                    key={event._id}
                    onClick={() => goToEvent(event)}
                    className={classnames(classes.row, classes.pointer)}
                >
                    <ParagraphText text={event.title} />
                </div>
            ))}
        </div>
    );
}

export default withStyles(styles)(RightPanel);