import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import /*type*/ { WithStyles } from '@material-ui/core/styles';
import Page from 'components/Page';
import Title from 'components/typography/Title';

const styles = () => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

interface Props extends WithStyles<typeof styles> {
}

function Auth({ classes }: Props) {
    return (
        <Page>
            <div className={classes.container}>
                <Title text="Auth Page" />
            </div>
        </Page>
    );
}

export default withStyles(styles)(Auth);