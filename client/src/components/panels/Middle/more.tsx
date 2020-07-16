import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';

import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core';
import Panel from './common/panel';
import Container from './common/container';
import Title from 'components/typography/Title';
import Subtitle from 'components/typography/Subtitle';
import ParagraphText from 'components/typography/ParagraphText';
import AddIcon from '@material-ui/icons/Add';
import { Routes } from 'utils/constants';

const styles = (theme: Theme) => createStyles({
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: `0 ${theme.spacing(3)}px`,
    height: 48
  },
  subtitleContainer: {
    marginBottom: theme.spacing(1)
  },
  button: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginRight: theme.spacing(2)
  },
  icon: {
    color: theme.palette.text.primary,
    fontSize: 30,
    [theme.breakpoints.down('sm')]: {
      fontSize: 24
    }
  }
});

function More({ classes }: WithStyles<typeof styles>) {
  const history = useHistory();

  const createCommunity = () => {
    history.push(Routes.CREATE_COMMUNITY);
  }

  return (
    <Panel>
      <div className={classes.titleContainer}>
        <Title text="More" />
      </div>
      <Container topSpacing={false}>
        <div className={classes.subtitleContainer}>
          <Subtitle text="Communities" />
        </div>
        <Button className={classes.button} onClick={createCommunity}>
          <div className={classes.iconContainer}>
            <AddIcon className={classes.icon} />
          </div>
          <ParagraphText text='Create a community' />
        </Button>
      </Container>
    </Panel>
  );
}

export default withStyles(styles)(More);
