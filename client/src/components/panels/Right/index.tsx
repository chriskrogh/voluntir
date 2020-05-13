import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Title from 'components/typography/Title';

const styles = (theme: Theme) => createStyles({
    panel: {
        display: 'flex',
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        backgroundColor: theme.palette.primary.main,
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