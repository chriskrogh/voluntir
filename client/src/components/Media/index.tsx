import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    container: {
        padding: `0 ${theme.spacing(1)}px`
    },
    image: {
        width: 488,
        height: 'auto'
    }
});

interface Props extends WithStyles<typeof styles> {
    medium: string;
}

function Media({ classes, medium }: Props) {
    return (
        <div className={classes.container}>
            <img src={medium} className={classes.image} />
        </div>
    );
}

export default withStyles(styles)(Media);