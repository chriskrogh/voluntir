import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import /*type*/ { WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const styles = (theme: Theme) => ({
    text: {
        color: theme.palette.text.secondary,
        margin: 0,
    }
});

interface Props extends WithStyles<typeof styles> {
    theme: Theme,
    text: string
}

function Subtitle({ classes, text }: Props) {
    return (
        <h3 className={classes.text}>
            {text}
        </h3>
    );
}

export default withStyles(styles, { withTheme: true })(Subtitle);