import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Title from 'components/typography/Title';

const styles = (theme: Theme) => createStyles({
    panel: {
        display: 'flex',
        height: '100%',
        marginTop: 48,
        width: 180,
        justifyContent: 'center',
        backgroundColor: theme.palette.secondary.main,
        borderRadius: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            width: 120
        },
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
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