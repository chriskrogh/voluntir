import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import /*type*/ { Community } from 'types/community';
import /*type*/ { Sections } from './types';

import React, { useState } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { ButtonGroup, Button } from '@material-ui/core';
import Panel from '../common/panel';
import Container from '../common/container';
import Content from './content';
import Title from 'components/typography/Title';
import ParagraphText from 'components/typography/ParagraphText'
import CreateCommunityForm from 'components/forms/CreateCommunity';

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
  instructions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
})

const initialCommunity = {
  _id: '0',
  name: 'Community Name',
  description: 'Use this section to tell people about your community. You can talk about your mission, your past events, and the contributions that you have made.',
  events: [],
  admins: [],
  createdAt: new Date(),
  updatedAt: new Date()
} as Community;

function CreateCommunity({ classes }: WithStyles<typeof styles>) {
  const [ preview, setPreview ] = useState(false);
  const [ community, setCommunity ] = useState(initialCommunity)

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
        <Content
          community={community}
          topSpacing={false}
          initialSection={Sections.ABOUT}
        />
      ) : (
        <Panel>
          <Container topSpacing={false}>
            <div className={classes.instructions}>
              <Title text="Tell us about your community!" />
              <ParagraphText text="We'll review your request when you're done." />
              <ParagraphText text="If it all looks good, we'll update you when it's live!" />
            </div>
            <CreateCommunityForm
              setCommunity={setCommunity}
              community={community}
            />
          </Container>
        </Panel>
      )}
    </div>
  );
}

export default withStyles(styles)(CreateCommunity);
