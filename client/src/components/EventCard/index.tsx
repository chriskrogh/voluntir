import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { Event } from 'types/event';
import { ScreenSize } from 'types/theme';
import CollapsableContainer from 'components/CollapseableContainer';
import Title from 'components/typography/Title';
import ParagraphText from 'components/typography/ParagraphText';
import Slider from 'components/Slider';

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

const getSliderContainerWidth = (screenSize: ScreenSize): number => {
    switch (screenSize) {
        case ScreenSize.MD:
            return 552;
        case ScreenSize.SM:
            return 392;
        case ScreenSize.XS:
            return Math.min(392, window.innerWidth - 48);
        default:
            return 552;
    }
}

interface Props extends WithStyles<typeof styles> {
    event: Event;
    className?: string;
    screenSize: ScreenSize;
}

function EventCard({ classes, className, event, screenSize }: Props) {
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
            {event.media && (
                <Slider
                    media={event.media}
                    containerWidth={getSliderContainerWidth(screenSize)}
                />
            )}
        </div>
    );
}

export default withStyles(styles)(EventCard);