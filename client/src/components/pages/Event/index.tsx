import React, { useState } from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Event } from 'types/event';
import { ButtonGroup, Button } from '@material-ui/core';
import Page from 'components/Page';
import Home from 'components/pages/Home';
import CollapseableContainer from 'components/CollapseableContainer';
import Title from 'components/typography/Title';
import ParagraphText from 'components/typography/ParagraphText';
import useQuery from 'utils/hooks/useQuery';
import events from 'data/home';

const styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: 960,
        [theme.breakpoints.down('sm')]: {
            width: 600
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        },
        padding: theme.spacing(2),
        marginTop: theme.spacing(3),
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
        backgroundColor: theme.palette.background.default,
        marginTop: theme.spacing(3),
    },
    button: {
        color: theme.palette.text.primary,
        borderColor: theme.palette.text.secondary,
        width: '100%'
    }
});

interface Props extends WithStyles<typeof styles> {
    id: string;
}

function EventPage({ classes, id }: Props) {
    // eslint-disable-next-line
    const [event, setEvent] = useState<Event>(events[parseInt(id)]);

    return (
        <Page>
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
                        className={classes.button}
                        onClick={() => { }}
                    >
                        LOG IN
                    </Button>
                    <Button
                        className={classes.button}
                        onClick={() => { }}
                    >
                        SIGN UP
                    </Button>
                </ButtonGroup>
            </div>
        </Page>
    );
}

const EventPageStylesWrapper = withStyles(styles)(EventPage);

export default function EventPageNavWrapper() {
    const id = useQuery().get("id");
    return (!id) ? <Home /> : <EventPageStylesWrapper id={id} />
}