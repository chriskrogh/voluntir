import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { Event } from 'types/event';
import CollapsableContainer from 'components/CollapseableContainer';
import Title from 'components/typography/Title';
import ParagraphText from 'components/typography/ParagraphText';

const styles = (theme: Theme) => createStyles({
    container: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(1),
        borderRadius: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    titleContainer: {
        marginBottom: theme.spacing(1)
    },
    descriptionContainer: {
        marginBottom: theme.spacing(2)
    }
});

interface Props extends WithStyles<typeof styles> {
    event: Event;
    className?: string;
}

function EventCard({ classes, className, event }: Props) {
    return (
        <div className={classnames(classes.container, className)}>
            <div className={classes.titleContainer}>
                <Title text={event.title} />
            </div>
            <CollapsableContainer
                containerClassName={classes.descriptionContainer}
                maxHeight={100}
            >
                <ParagraphText text={event.description} />
            </CollapsableContainer>
        </div>
    );
}

export default withStyles(styles)(EventCard);