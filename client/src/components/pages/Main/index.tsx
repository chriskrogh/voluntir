import React, { useState } from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Page from 'components/Page';
import Left from 'components/panels/Left';
import Middle from 'components/panels/Middle';
import Right from 'components/panels/Right';
import { Panels } from 'utils/constants';

const styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: 960,
        [theme.breakpoints.down('sm')]: {
            width: 600
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        }
    }
});

function Main({ classes }: WithStyles<typeof styles>) {
    const [panel, setPanel] = useState(Panels.HOME);

    return (
        <Page>
            <div className={classes.container}>
                <Left setPanel={setPanel} />
                <Middle panel={panel} />
                <Right />
            </div>
        </Page>
    );
}

export default withStyles(styles)(Main);