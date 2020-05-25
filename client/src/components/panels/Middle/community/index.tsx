import React, { useState } from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import /*type*/ { History } from 'history';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { ButtonGroup } from '@material-ui/core';
import EventList from 'components/lists/EventList';
import Title from 'components/typography/Title';
import ParagraphText from 'components/typography/ParagraphText';
import SelectableButton from './SelectableButton';
import communities from 'data/communities';
import M from 'utils/errorMessages';
import useQuery from 'utils/hooks/useQuery';
import { Routes } from 'utils/constants';
import Sections from './sections';
import events from 'data/events';

const bannerHeight = 240;
const logoSize = bannerHeight / 2;

const styles = (theme: Theme) => createStyles({
  panel: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: 600,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('sm')]: {
      width: 440
    }
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: `48px ${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
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
  aboutContainer: {
    margin: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px`,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(1)
  }
});

const getUpcomingEvents = (eventIds: string[]) => {
  // replace with special request to db
  return [events[parseInt(eventIds[0])]];
}

const getCompletedEvents = (eventIds: string[]) => {
  // replace with special request to db
  return [events[parseInt(eventIds[1])]];
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

  const { banner, logo, name, description, events } = community;

  const [section, setSection] = useState(Sections.HOME);

  return (
    <div className={classes.panel}>
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
          <SelectableButton
            section={Sections.HOME}
            setSection={setSection}
            currentSection={section}
          />
          {description && (
            <SelectableButton
              section={Sections.ABOUT}
              setSection={setSection}
              currentSection={section}
            />
          )}
          <SelectableButton
            section={Sections.UPCOMING}
            setSection={setSection}
            currentSection={section}
          />
        </ButtonGroup>
      </div>
      {section === Sections.HOME && (
        <EventList events={getCompletedEvents(events)} />
      )}
      {section === Sections.ABOUT && description && (
        <div className={classes.aboutContainer}>
          <ParagraphText text={description} />
        </div>
      )}
      {section === Sections.UPCOMING && (
        <EventList events={getUpcomingEvents(events)} />
      )}
    </div>
  );
}

export default withStyles(styles)(CommunityPanel);