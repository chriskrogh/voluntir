import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigatePreviousIcon from '@material-ui/icons/NavigateBefore';
import Media from 'components/Media';

const styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    },
    carousel: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
    },
    iconContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24
    },
    icon: {
        fontSize: 20
    }
});

interface Props extends WithStyles<typeof styles> {
    media: string[];
}

function Gallery({ classes, media }: Props) {
    const hasManyMedia = media.length > 0;
    return (
        <div className={classes.container}>
            {hasManyMedia && (
                <div className={classes.iconContainer}>
                    <NavigatePreviousIcon className={classes.icon} />
                </div>
            )}
            <div className={classes.carousel}>
                {media.map(medium => <Media key={medium} medium={medium} />)}
            </div>
            {hasManyMedia && (
                <div className={classes.iconContainer}>
                    <NavigateNextIcon className={classes.icon} />
                </div>
            )}
        </div>
    );
}

export default withStyles(styles)(Gallery);