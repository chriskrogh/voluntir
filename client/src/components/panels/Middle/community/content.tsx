import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import /*type*/ { Event } from 'types/event';
import /*type*/ { User } from 'types/user';
import /*type*/ { Community } from 'types/community';

import React, { useState } from 'react';
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
import { Sections } from './types';
import Subtitle from 'components/typography/Subtitle';

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
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

interface Props extends WithStyles<typeof styles> {
  community: Community;
  topSpacing?: boolean;
  initialSection?: Sections;
}

function CommunityPanelContent({
  classes,
  community,
  topSpacing = true,
  initialSection = Sections.HOME,
}: Props) {
  const { banner, logo, name, description } = community;
  const [ section, setSection ] = useState(initialSection);

  const homeEvents = [] as Event[];
  const upcomingEvents = [] as Event[];
  const admins = [] as User[];

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
          <Button
            className={classnames(
              classes.button,
              { [classes.selectedButton]: section === Sections.UPCOMING }
            )}
            onClick={() => setSection(Sections.UPCOMING)}
          >
            {Sections.UPCOMING}
          </Button>
          <Button
            className={classnames(
              classes.button,
              { [classes.selectedButton]: section === Sections.ABOUT }
            )}
            onClick={() => setSection(Sections.ABOUT)}
          >
            {Sections.ABOUT}
          </Button>
        </ButtonGroup>
      </Container>
      {section === Sections.HOME && (homeEvents.length !== 0 ? (
        <EventList events={homeEvents} />
      ) : (
        <div className={classes.center}>
          <Subtitle text="Events that you've hosted in the past will be shown here" />
        </div>
      ))}
      {section === Sections.ABOUT && (
        <>
          <div className={classnames(classes.middleContainer, classes.aboutContainer)}>
            <ParagraphText text={description} />
          </div>
          <div className={classes.middleContainer}>
            <Title text="Admins" />
          </div>
          { admins.length !== 0 ? (
            <div className={classes.middleContainer}>
              <UserList users={admins} />
            </div>
          ) : (
            <div className={classes.center}>
              <Subtitle text="A list of community admins will be shown here" />
            </div>
          )}
        </>
      )}
      {section === Sections.UPCOMING && (upcomingEvents.length !== 0 ? (
        <EventList events={upcomingEvents} />
      ) : (
        <div className={classes.center}>
          <Subtitle text="Events that you plan on hosting will be shown here" />
        </div>
      ))}
    </Panel>
  );
}

export default withStyles(styles)(CommunityPanelContent);
