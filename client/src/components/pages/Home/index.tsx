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

function Home({ classes }: WithStyles<typeof styles>) {
    return (
        <Page>
            <div className={classes.container}>
                <Title text="Home Page" />
            </div>
        </Page>
    );
}

export default withStyles(styles)(Home);