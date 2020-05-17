import React, { useContext } from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { MainContext } from 'context/main/state';
import { ButtonGroup, Button } from '@material-ui/core';
import CollapseableContainer from 'components/CollapseableContainer';
import Title from 'components/typography/Title';
import ParagraphText from 'components/typography/ParagraphText';

const styles = (theme: Theme) => createStyles({
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

function EventPanel({ classes }: WithStyles<typeof styles>) {
    const { event } = useContext(MainContext);
    return (
        <div>
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
    );
}

export default withStyles(styles)(EventPanel);