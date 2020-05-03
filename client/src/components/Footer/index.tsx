import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import classnames from 'classnames';

const styles = (theme: Theme) => createStyles({
    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
        height: 60,
        width: '100%',
        boxShadow: '2px 2px 4px #888',
        [theme.breakpoints.down('sm')]: {
            height: 40
        }
    },
});

interface Props extends WithStyles<typeof styles> {
    heightClassName: string
}

function Footer({ classes, heightClassName }: Props) {
    return (
        <div className={classnames(classes.footer, heightClassName)}>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(Footer);