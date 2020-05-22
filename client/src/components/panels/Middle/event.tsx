import React, { useState } from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import /*type*/ { History } from 'history';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import { ButtonGroup, Button } from '@material-ui/core';
import CollapseableContainer from 'components/CollapseableContainer';
import Title from 'components/typography/Title';
import ParagraphText from 'components/typography/ParagraphText';
import Slider from 'components/Slider';
import useScreenSize from 'utils/hooks/useScreenSize';
import useQuery from 'utils/hooks/useQuery';
import events from 'data/events';
import M from 'utils/errorMessages';
import { Routes } from 'utils/constants';

const styles = (theme: Theme) => createStyles({
    panel: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: 600,
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.down('sm')]: {
            width: 440
        }
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        margin: `48px ${theme.spacing(2)}px 0 ${theme.spacing(2)}px`,
        padding: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
        borderRadius: theme.spacing(1)
    },
    titleContainer: {
        flex: 1,
    },
    descriptionContainer: {
        flex: 1,
        marginTop: theme.spacing(2)
    },
    buttonGroup: {
        marginTop: theme.spacing(3),
    },
    button: {
        color: theme.palette.text.primary,
        borderColor: theme.palette.text.secondary,
        width: '100%'
    },
    selectedButton: {
        backgroundColor: theme.palette.secondary.main
    },
    sectionContainer: {
        marginTop: theme.spacing(3)
    }
});

enum Sections {
    GALLERY = 'Gallery',
    LOCATION = 'Location'
}

const getEvent = (id: string | null, history: History) => {
    if (id == null) {
        console.warn(M.EVENT_PAGE_ID);
        history.push(Routes.HOME);
        return events[0];
    } else {
        return events[parseInt(id)];
    }
}

function EventPanel({ classes }: WithStyles<typeof styles>) {
    const history = useHistory();

    const screenSize = useScreenSize();
    const eventId = useQuery().get('id');
    const event = getEvent(eventId, history);

    const [section, setSection] = useState(event.media != null
        ? Sections.GALLERY
        : Sections.LOCATION
    );

    return (
        <div className={classes.panel}>
            <div className={classes.container}>
                <div className={classes.titleContainer}>
                    <Title text={event.title} />
                </div>
                <CollapseableContainer
                    containerClassName={classes.descriptionContainer}
                    maxHeight={200}
                >
                    <ParagraphText text={event.description} />
                </CollapseableContainer>
                <ButtonGroup className={classes.buttonGroup}>
                    <Button
                        className={classnames(
                            classes.button,
                            { [classes.selectedButton]: section === Sections.GALLERY }
                        )}
                        onClick={() => setSection(Sections.GALLERY)}
                    >
                        Gallery
                </Button>
                    <Button
                        className={classnames(
                            classes.button,
                            { [classes.selectedButton]: section === Sections.LOCATION }
                        )}
                        onClick={() => setSection(Sections.LOCATION)}
                    >
                        Location
                </Button>
                </ButtonGroup>
                <div className={classes.sectionContainer}>
                    {section === Sections.GALLERY && event.media && (
                        <Slider
                            media={event.media}
                            screenSize={screenSize}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default withStyles(styles)(EventPanel);