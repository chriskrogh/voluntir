import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import /*type*/ { WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const styles = (theme: Theme) => ({
    text: {
        color: theme.palette.text.primary,
        margin: 0,
    }
});

interface Props extends WithStyles<typeof styles> {
    theme: Theme,
    text: string
}

function ParagraphText({ classes, text }: Props) {
    return (
        <p className={classes.text}>
            {text}
        </p>
    );
}

export default withStyles(styles, { withTheme: true })(ParagraphText);