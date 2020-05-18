import React, { useContext } from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { Event } from 'types/event';
import { ScreenSize } from 'types/theme';
import { MainContext } from 'context/main/state';
import CollapsableContainer from 'components/CollapseableContainer';
import Title from 'components/typography/Title';
import ParagraphText from 'components/typography/ParagraphText';
import Slider from 'components/Slider';
import { Panels } from 'utils/constants';

const styles = (theme: Theme) => createStyles({
    container: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(1),
        borderRadius: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    clickableContainer: {
        cursor: 'pointer'
    },
    descriptionContainer: {
        marginBottom: theme.spacing(1)
    },
    textContainer: {
        marginBottom: theme.spacing(1)
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
    const { setPanel, setEvent } = useContext(MainContext);

    const expandEvent = () => {
        setEvent(event);
        setPanel(Panels.EVENT);
    }

    return (
        <div className={classnames(classes.container, className)}>
            <div
                className={classnames(classes.textContainer, classes.clickableContainer)}
                onClick={expandEvent}
            >
                <Title text={event.title} />
            </div>
            <div className={classes.descriptionContainer}>
                <CollapsableContainer
                    containerClassName={classes.textContainer}
                    maxHeight={100}
                >
                    <div className={classes.clickableContainer} onClick={expandEvent}>
                        <ParagraphText text={event.description} />
                    </div>
                </CollapsableContainer>
            </div>
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