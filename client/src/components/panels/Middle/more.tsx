import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Panel from './common/panel';
import Container from './common/container';
import Title from 'components/typography/Title';
import AddIcon from '@material-ui/icons/Add';
import ParagraphText from 'components/typography/ParagraphText';

const styles = (theme: Theme) => createStyles({
  container: {
    margin: `0 ${theme.spacing(2)}px`
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: `0 ${theme.spacing(2)}px`,
    height: 48
  },
  button: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
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
  return (
    <Panel>
      <div className={classes.titleContainer}>
        <Title text="More" />
      </div>
      <Container className={classes.container}>
        <div>
          <Button className={classes.button}>
            <AddIcon className={classes.icon} />
            <ParagraphText text='Create a community' />
          </Button>
        </div>
      </Container>
    </Panel>
  );
}

export default withStyles(styles)(More);