import type { WithStyles, Theme } from '@material-ui/core/styles';
import type { History } from 'history';

import React, { useState } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import { ButtonGroup, Button } from '@material-ui/core';
import Panel from '../common/panel';
import Container from '../common/container';
import CollapseableContainer from 'components/CollapseableContainer';
import Title from 'components/typography/Title';
import ParagraphText from 'components/typography/ParagraphText';
import Slider from 'components/Slider';
import useQuery from 'utils/hooks/useQuery';
import events from 'data/events';
import M from 'utils/errorMessages';
import { Routes } from 'utils/constants';
import { getCommunityLogo } from 'utils/api/community';

const styles = (theme: Theme) => createStyles({
  container: {
    flexDirection: 'row'
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 736,
    [theme.breakpoints.down('md')]: {
      width: 502
    },
    [theme.breakpoints.down('sm')]: {
      width: 356
    },
    [theme.breakpoints.down('xs')]: {
      width: Math.min(356, window.innerWidth - 48)
    }
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    cursor: 'pointer',
    marginRight: theme.spacing(2),
    width: 44,
    height: 44,
    borderRadius: 22,
    [theme.breakpoints.down('md')]: {
      marginRight: theme.spacing(1),
      width: 32,
      height: 32,
      borderRadius: 16,
    },
    [theme.breakpoints.down('sm')]: {
      width: 28,
      height: 28,
      borderRadius: 14,
    }
  },
  logo: {
    maxHeight: '100%',
  },
  clickableContainer: {
    cursor: 'pointer'
  },
  descriptionContainer: {
    marginTop: theme.spacing(2)
  },
  buttonGroup: {
    marginTop: theme.spacing(2),
  },
  button: {
    color: theme.palette.text.primary,
    border: 'none',
    width: '100%'
  },
  selectedButton: {
    backgroundColor: theme.palette.secondary.main
  },
  sectionContainer: {
    marginTop: theme.spacing(2)
  }
});

enum Sections {
  GALLERY = 'Gallery',
  LOCATION = 'Location',
  GOING = 'Going'
}

const getEvent = (id: string | null, history: History) => {
  if (id == null) {
    console.warn(M.EVENT_PAGE_ID);
    history.push(Routes.HOME);
    return events[0];
  } else {
    // replace with api call
    return events[parseInt(id)];
  }
}

function EventPanel({ classes }: WithStyles<typeof styles>) {
  const history = useHistory();

  const eventId = useQuery().get('id');
  const event = getEvent(eventId, history);

  const { title, community, communityName, description, media } = event;

  const [ section, setSection ] = useState(media != null
    ? Sections.GALLERY
    : Sections.LOCATION
  );

  const goToCommunity = () => {
    history.push(Routes.COMMUNITY + '?id=' + community);
  }

  return (
    <Panel>
      <Container className={classes.container} >
        <div className={classes.logoContainer} onClick={goToCommunity}>
          <img
            src={getCommunityLogo(community)}
            className={classes.logo}
            alt="logo"
          />
        </div>
        <div className={classes.contentContainer}>
          <div className={classes.clickableContainer} onClick={goToCommunity}>
            <ParagraphText text={communityName} underline />
          </div>
          <Title text={title} />
          <CollapseableContainer
            containerClassName={classes.descriptionContainer}
            maxHeight={200}
          >
            <ParagraphText text={description} />
          </CollapseableContainer>
          <ButtonGroup className={classes.buttonGroup}>
            <Button
              className={classnames(
                classes.button,
                { [classes.selectedButton]: section === Sections.GALLERY }
              )}
              onClick={() => setSection(Sections.GALLERY)}
            >
              Gallery
            </Button>
            <Button
              className={classnames(
                classes.button,
                { [classes.selectedButton]: section === Sections.LOCATION }
              )}
              onClick={() => setSection(Sections.LOCATION)}
            >
              Location
            </Button>
            <Button
              className={classnames(
                classes.button,
                { [classes.selectedButton]: section === Sections.GOING }
              )}
              onClick={() => setSection(Sections.GOING)}
            >
              Going
            </Button>
          </ButtonGroup>
          <div className={classes.sectionContainer}>
            {section === Sections.GALLERY && media && (
              <Slider media={media} />
            )}
          </div>
        </div>
      </Container>
    </Panel>
  );
}

export default withStyles(styles)(EventPanel);
