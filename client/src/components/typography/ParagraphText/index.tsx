import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) => ({
    text: {
        fontSize: 16,
        color: theme.palette.text.primary,
        margin: 0,
        [theme.breakpoints.down('sm')]: {
            fontSize: 14
        }
    },
    underline: {
        borderBottom: `1px solid ${theme.palette.text.primary}`,
    }
});

interface Props extends WithStyles<typeof styles> {
    text: string;
    color?: string;
    underline?: boolean;
}

function ParagraphText({ classes, color, text, underline }: Props) {
    return (
        <p
            className={classnames(
                classes.text,
                { [classes.underline]: underline }
            )}
            style={{ color }}
        >
            {text}
        </p>
    );
}

export default withStyles(styles)(ParagraphText);