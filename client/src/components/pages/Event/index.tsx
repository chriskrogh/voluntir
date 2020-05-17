import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Page from 'components/Page';
import Home from 'components/pages/Home';
import useQuery from 'utils/hooks/useQuery';

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

interface Props extends WithStyles<typeof styles> {
    id: string;
}

function EventPage({ classes, id }: Props) {
    const [event, setEvent] = useState();
    return (
        <Page>
            <div className={classes.container}>
                {id}
            </div>
        </Page>
    );
}

const EventPageStylesWrapper = withStyles(styles)(EventPage);

export default function EventPageNavWrapper() {
    const id = useQuery().get("id");
    return (!id) ? <Home /> : <EventPageStylesWrapper id={id} />
}