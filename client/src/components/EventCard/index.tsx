import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import { Event } from 'types/event';
import CollapsableContainer from 'components/CollapseableContainer';
import Title from 'components/typography/Title';
import ParagraphText from 'components/typography/ParagraphText';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Slider from 'components/Slider';
import useScreenSize from 'utils/hooks/useScreenSize';
import { Routes } from 'utils/constants';

const styles = (theme: Theme) => createStyles({
    container: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(1),
        borderRadius: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    titleContainer: {
        marginBottom: theme.spacing(1),
        cursor: 'pointer'
    },
    communityContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: theme.spacing(2),
        cursor: 'pointer'
    },
    hostedByContainer: {
        marginRight: theme.spacing(1) / 2
    },
    clickableContainer: {
        cursor: 'pointer'
    },
    textContainer: {
        marginBottom: theme.spacing(1)
    },
    locationContainer: {
        display: 'flex',
        alignItems: 'center',
        width: 'calc(100% - 70px)',
        marginTop: -24,
        marginBottom: theme.spacing(1),
        cursor: 'pointer'
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
    const history = useHistory();

    const { title, community, communityName, description, location, media, _id } = event;

    const goToEvent = () => {
        history.push(Routes.EVENT + '?id=' + _id);
    }

    const goToCommunity = () => {
        history.push(Routes.COMMUNITY + '?id=' + community);
    }

    return (
        <div className={classnames(classes.container, className)}>
            <div
                className={classes.titleContainer}
                onClick={goToEvent}
            >
                <Title text={title} />
            </div>
            <div className={classes.communityContainer} onClick={goToCommunity}>
                <div className={classes.hostedByContainer}>
                    <ParagraphText
                        text="hosted by"
                        color={theme.palette.text.secondary}
                    />
                </div>
                <ParagraphText
                    text={communityName}
                    color={theme.palette.text.secondary}
                    underline
                />
            </div>
            <div>
                <CollapsableContainer
                    containerClassName={classes.textContainer}
                    maxHeight={100}
                >
                    <div className={classes.clickableContainer} onClick={goToEvent}>
                        <ParagraphText text={description} />
                    </div>
                </CollapsableContainer>
            </div>
            <div
                className={classes.locationContainer}
                onClick={goToEvent}
            >
                <LocationOnIcon className={classes.locationIcon} />
                <ParagraphText
                    text={location}
                    color={theme.palette.text.secondary}
                />
            </div>
            {media && (
                <Slider
                    media={media}
                    screenSize={screenSize}
                />
            )}
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(EventCard);