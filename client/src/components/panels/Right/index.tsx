import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Title from 'components/typography/Title';

const styles = (theme: Theme) => createStyles({
    panel: {
        display: 'flex',
        height: '100%',
        width: 180,
        justifyContent: 'center',
        backgroundColor: theme.palette.secondary.main,
    }
});

function RightPanel({ classes }: WithStyles<typeof styles>) {
    return (
        <div className={classes.panel}>
            <Title text="Right Panel" />
        </div>
    );
}

export default withStyles(styles)(RightPanel);