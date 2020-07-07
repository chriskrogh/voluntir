import React, { useState } from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { ButtonGroup, Button } from '@material-ui/core';
import Panel from '../common/panel';
import Container from '../common/container';
import Content from './content';
import communities from 'data/communities';

const styles = (theme: Theme) => createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  panelContainer: {
    margin: `0 ${theme.spacing(2)}px`
  },
  buttonGroup: {
    margin: theme.spacing(2),
  },
  selectedButton: {
    backgroundColor: theme.palette.background.paper
  },
})

function CreateCommunity({ classes }: WithStyles<typeof styles>) {
  const [ preview, setPreview ] = useState(false);
  const [ community, setCommunity ] = useState(communities[0])

  return (
    <div className={classes.container}>
      <ButtonGroup className={classes.buttonGroup}>
        <Button
          onClick={() => setPreview(false)}
          className={!preview ? classes.selectedButton : ''}
        >
          Create
        </Button>
        <Button
          onClick={() => setPreview(true)}
          className={preview ? classes.selectedButton : ''}
        >
          Preview
        </Button>
      </ButtonGroup>
      {preview ? (
        <Content community={community} />
      ) : (
        <Panel>
          <Container topSpacing={false}>
            hello
          </Container>
        </Panel>
      )}
    </div>
  );
}

export default withStyles(styles)(CreateCommunity);
