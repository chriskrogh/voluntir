import React, { useState } from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import /*type*/ { History } from 'history';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';
import { ButtonGroup, Button } from '@material-ui/core';
import Panel from '.';
import EventList from 'components/lists/EventList';
import UserList from 'components/lists/UserList';
import Title from 'components/typography/Title';
import ParagraphText from 'components/typography/ParagraphText';
import communities from 'data/communities';
import M from 'utils/errorMessages';
import useQuery from 'utils/hooks/useQuery';
import { Routes } from 'utils/constants';
import events from 'data/events';
import users from 'data/users';

const bannerHeight = 240;
const logoSize = bannerHeight / 2;

const styles = (theme: Theme) => createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: `48px ${theme.spacing(2)}px 0 ${theme.spacing(2)}px`,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(1)
  },
  bannerLogoContainer: {
    display: 'flex',
    height: bannerHeight,
    marginBottom: theme.spacing(1),
    position: 'relative'
  },
  banner: {
    width: '100%',
    height: bannerHeight - logoSize / 2,
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
  },
  logoWrapper: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    position: 'absolute'
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: logoSize,
    height: logoSize,
    marginLeft: theme.spacing(2),
    borderRadius: logoSize / 2,
    overflow: 'hidden'
  },
  logo: {
    maxHeight: '100%'
  },
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

const getUpcomingEvents = (eventIds: string[]) => {
  // replace with special request to server
  return [events[parseInt(eventIds[0])]];
}

const getCompletedEvents = (eventIds: string[]) => {
  // replace with special request to server
  return [events[parseInt(eventIds[1])]];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAdmins = (admins: string[]) => {
  // replace with special request to server
  return users;
}

const getCommnity = (id: string | null, history: History) => {
  if (id == null) {
    console.error(M.COMMUNITY_PAGE_ID);
    history.push(Routes.HOME)
    return communities[0];
  } else {
    return communities[parseInt(id)];
  }
}

function CommunityPanel({ classes }: WithStyles<typeof styles>) {
  const history = useHistory();

  const id = useQuery().get('id');
  const community = getCommnity(id, history);

  const { banner, logo, name, description, events, admins } = community;

  const [section, setSection] = useState(Sections.HOME);

  return (
    <Panel>
      <div className={classes.container}>
        <div className={classes.bannerLogoContainer}>
          <div
            className={classes.banner}
            style={{backgroundImage: `url(${banner})`}}
          />
          <div className={classes.logoWrapper}>
            <div className={classes.logoContainer}>
              <img
                src={logo}
                className={classes.logo}
                alt="logo"
              />
            </div>
          </div>
        </div>
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
      </div>
      {section === Sections.HOME && (
        <EventList events={getCompletedEvents(events)} />
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
        <EventList events={getUpcomingEvents(events)} />
      )}
    </Panel>
  );
}

export default withStyles(styles)(CommunityPanel);