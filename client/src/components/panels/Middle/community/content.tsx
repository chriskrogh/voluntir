import React, { useState } from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import /*type*/ { Community } from 'types/community';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { ButtonGroup, Button } from '@material-ui/core';
import Panel from '../common/panel';
import Container from '../common/container';
import BannerPicture from 'components/BannerPicture';
import EventList from 'components/lists/EventList';
import UserList from 'components/lists/UserList';
import Title from 'components/typography/Title';
import ParagraphText from 'components/typography/ParagraphText';
import { Panels } from 'utils/constants';
import events from 'data/events';
import users from 'data/users';

const styles = (theme: Theme) => createStyles({
  nameContainer: {
    marginBottom: theme.spacing(1)
  },
  buttonContainer: {
    marginBottom: theme.spacing(1)
  },
  button: {
    color: theme.palette.text.primary,
    border: 'none',
    width: '100%'
  },
  selectedButton: {
    backgroundColor: theme.palette.secondary.main
  },
  middleContainer: {
    margin: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px`,
  },
  aboutContainer: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1)
  }
});

enum Sections {
  HOME = 'Home',
  ABOUT = 'About',
  UPCOMING = 'Upcoming'
}

const getUpcomingEvents = () => {
  // replace with special request to server
  return events;
}

const getCompletedEvents = () => {
  // replace with special request to server
  return events;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAdmins = (admins: string[]) => {
  // replace with special request to server
  return users;
}

interface Props extends WithStyles<typeof styles> {
  community: Community;
  topSpacing?: boolean;
}

function CommunityPanelContent({ classes, topSpacing = true, community }: Props) {
  const { banner, logo, name, description, admins } = community;
  const [ section, setSection ] = useState(Sections.HOME);

  return (
    <Panel>
      <Container topSpacing={topSpacing}>
        <BannerPicture
          banner={banner}
          picture={logo}
          panel={Panels.COMMUNITY}
        />
        <div className={classes.nameContainer}>
          <Title text={name} />
        </div>
        <ButtonGroup>
          <Button
            className={classnames(
              classes.button,
              { [classes.selectedButton]: section === Sections.HOME }
            )}
            onClick={() => setSection(Sections.HOME)}
          >
            {Sections.HOME}
          </Button>
          {description && (
            <Button
              className={classnames(
                classes.button,
                { [classes.selectedButton]: section === Sections.ABOUT }
              )}
              onClick={() => setSection(Sections.ABOUT)}
            >
              {Sections.ABOUT}
            </Button>
          )}
          <Button
            className={classnames(
              classes.button,
              { [classes.selectedButton]: section === Sections.UPCOMING }
            )}
            onClick={() => setSection(Sections.UPCOMING)}
          >
            {Sections.UPCOMING}
          </Button>
        </ButtonGroup>
      </Container>
      {section === Sections.HOME && (
        <EventList events={getCompletedEvents()} />
      )}
      {section === Sections.ABOUT && description && (
        <>
          <div className={classnames(classes.middleContainer, classes.aboutContainer)}>
            <ParagraphText text={description} />
          </div>
          <div className={classes.middleContainer}>
            <Title text="Admins" />
          </div>
          <div className={classes.middleContainer}>
            <UserList users={getAdmins(admins)} />
          </div>
        </>
      )}
      {section === Sections.UPCOMING && (
        <EventList events={getUpcomingEvents()} />
      )}
    </Panel>
  );
}

export default withStyles(styles)(CommunityPanelContent);
