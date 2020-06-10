import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Panel from './common/Panel';
import Container from './common/Container';
import Title from 'components/typography/Title';
import Subtitle from 'components/typography/Subtitle';
import ThemeToggleButton from 'components/buttons/ThemeToggle';

const styles = (theme: Theme) => createStyles({
  container: {
    margin: `0 ${theme.spacing(2)}px`
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: `0 ${theme.spacing(3)}px`,
    height: 48
  },
  subtitleContainer: {
    marginBottom: theme.spacing(1)
  }
});

function Settings({ classes }: WithStyles<typeof styles>) {
  return (
    <Panel>
      <div className={classes.titleContainer}>
        <Title text="Settings" />
      </div>
      <Container className={classes.container}>
        <div className={classes.subtitleContainer}>
          <Subtitle text="Theme" />
        </div>
        <ThemeToggleButton />
      </Container>
    </Panel>
  );
}

export default withStyles(styles)(Settings);
