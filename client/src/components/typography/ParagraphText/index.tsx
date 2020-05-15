import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => ({
    text: {
        fontSize: 16,
        color: theme.palette.text.primary,
        margin: 0,
        [theme.breakpoints.down('sm')]: {
            fontSize: 14
        }
    }
});

interface Props extends WithStyles<typeof styles> {
    text: string;
}

function ParagraphText({ classes, text }: Props) {
    return (
        <p className={classes.text}>
            {text}
        </p>
    );
}

export default withStyles(styles)(ParagraphText);