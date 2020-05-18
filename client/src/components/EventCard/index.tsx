import React, { useContext } from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { Event } from 'types/event';
import { MainContext } from 'context/main/state';
import CollapsableContainer from 'components/CollapseableContainer';
import Title from 'components/typography/Title';
import ParagraphText from 'components/typography/ParagraphText';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Slider from 'components/Slider';
import { Panels } from 'utils/constants';
import useScreenSize from 'utils/hooks/useScreenSize';

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
    },
    locationContainer: {
        display: 'flex',
        alignItems: 'center',
        width: 'calc(100% - 70px)',
        marginTop: -30,
        marginBottom: theme.spacing(1)
    },
    locationIcon: {
        color: theme.palette.error.main
    }
});

interface Props extends WithStyles<typeof styles> {
    theme: Theme;
    event: Event;
    className?: string;
}

function EventCard({ classes, theme, className, event }: Props) {
    const screenSize = useScreenSize();
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
            <div
                className={classnames(
                    classes.locationContainer,
                    classes.clickableContainer
                )}
                onClick={expandEvent}
            >
                <LocationOnIcon className={classes.locationIcon} />
                <ParagraphText
                    text={event.location}
                    color={theme.palette.text.secondary}
                />
            </div>
            {event.media && (
                <Slider
                    media={event.media}
                    screenSize={screenSize}
                />
            )}
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(EventCard);