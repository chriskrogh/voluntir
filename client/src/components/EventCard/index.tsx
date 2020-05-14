import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { Event } from 'types/event';
import Title from 'components/typography/Title';

const styles = (theme: Theme) => createStyles({
    container: {
        marginTop: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(1)
    }
});

interface Props extends WithStyles<typeof styles> {
    event: Event;
    className?: string;
}

function EventCard({ classes, className, event }: Props) {
    return (
        <div className={classnames(classes.container, className)}>
            <Title text={event.title} />
        </div>
    );
}

export default withStyles(styles)(EventCard);