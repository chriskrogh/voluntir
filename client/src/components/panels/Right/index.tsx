import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { Event } from 'types/event';
import events from 'data/events';
import ParagraphText from 'components/typography/ParagraphText';

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
    row: {
        marginTop: theme.spacing(1),
        paddingBottom: theme.spacing(1) / 2,
        borderBottom: `1px solid ${theme.palette.text.secondary}`
    },
    firstRow: {
        marginTop: 0
    }
});

const getUpcomingEvents = (): Event[] => {
    return events;
}

function RightPanel({ classes }: WithStyles<typeof styles>) {
    return (
        <div className={classes.panel}>
            {getUpcomingEvents().map((event, index) => (
                <div
                    key={event._id}
                    className={
                        classnames(
                            classes.row,
                            (index === 0) ? classes.firstRow : undefined
                        )
                    }
                >
                    <ParagraphText text={event.title} />
                </div>
            ))}
        </div>
    );
}

export default withStyles(styles)(RightPanel);