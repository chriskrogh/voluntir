import React, { useContext } from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { MainContext } from 'context/main/state';
import Feed from './feed';
import ProfilePanel from './profile';
import EventPanel from './event';
import { Panels } from 'utils/constants';

const styles = (theme: Theme) => createStyles({
    panel: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: 600,
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.down('sm')]: {
            width: 440
        }
    }
});

interface PanelProps {
    panel: Panels;
}

function Panel({ panel }: PanelProps) {
    switch (panel) {
        case Panels.HOME:
        case Panels.EXPLORE:
            return <Feed panel={panel} />
        case Panels.PROFILE:
            return <ProfilePanel />;
        case Panels.EVENT:
            return <EventPanel />;
        default:
            return <Feed panel={Panels.HOME} />;
    }
}

function MiddlePanel({ classes }: WithStyles<typeof styles>) {
    const { panel } = useContext(MainContext);
    return (
        <div className={classes.panel}>
            <Panel panel={panel} />
        </div>
    );
}

export default withStyles(styles)(MiddlePanel);