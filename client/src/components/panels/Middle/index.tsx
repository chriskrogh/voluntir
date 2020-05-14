import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Title from 'components/typography/Title';
import { Pages } from 'utils/constants';

const styles = (theme: Theme) => createStyles({
    panel: {
        display: 'flex',
        height: '100%',
        width: 600,
        backgroundColor: theme.palette.background.default,
    },
    titleContainer: {
        marginLeft: theme.spacing(2)
    }
});

interface Props extends WithStyles<typeof styles> {
    page: Pages;
}

function MiddlePanel({ classes, page }: Props) {
    return (
        <div className={classes.panel}>
            <div className={classes.titleContainer}>
                <Title text={page} />
            </div>
        </div>
    );
}

export default withStyles(styles)(MiddlePanel);