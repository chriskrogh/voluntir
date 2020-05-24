import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import { Event } from 'types/event';
import CollapsableContainer from 'components/CollapseableContainer';
import Title from 'components/typography/Title';
import ParagraphText from 'components/typography/ParagraphText';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PlayArrow from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import Slider from 'components/Slider';
import useScreenSize from 'utils/hooks/useScreenSize';
import { Routes } from 'utils/constants';
import { getCommunityLogo } from 'utils/api/community';
import { getLocalTime } from 'utils';

const styles = (theme: Theme) => createStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  contentContainer: {
    width: 502,
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
    marginRight: theme.spacing(1),
    overflow: 'hidden',
    cursor: 'pointer',
    width: 32,
    height: 32,
    borderRadius: 16,
    [theme.breakpoints.down('sm')]: {
      width: 28,
      height: 28,
      borderRadius: 14,
    }
  },
  logo: {
    maxHeight: '100%',
  },
  titleContainer: {
    marginBottom: theme.spacing(1),
    cursor: 'pointer'
  },
  hostedByContainer: {
    marginRight: theme.spacing(1) / 2
  },
  clickableContainer: {
    cursor: 'pointer'
  },
  textContainer: {
    marginBottom: theme.spacing(1)
  },
  locationContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing(1),
    cursor: 'pointer'
  },
  locationIcon: {
    color: theme.palette.error.main
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginBottom: theme.spacing(1),
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%'
  },
  startIcon: {
    color: theme.palette.success.main,
    marginRight: theme.spacing(1)
  },
  stopIcon: {
    color: theme.palette.error.main,
    marginRight: theme.spacing(1)
  }
});

interface Props extends WithStyles<typeof styles> {
  theme: Theme;
  event: Event;
  className?: string;
}

function EventCard({ classes, theme, className, event }: Props) {
  const screenSize = useScreenSize();
  const history = useHistory();

  const {
    _id,
    title,
    description,
    location,
    media,
    start,
    end,
    community,
    communityName
  } = event;

  const goToEvent = () => {
    history.push(Routes.EVENT + '?id=' + _id);
  }

  const goToCommunity = () => {
    history.push(Routes.COMMUNITY + '?id=' + community);
  }

  return (
    <div className={classnames(classes.container, className)}>
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
        <div
          className={classes.titleContainer}
          onClick={goToEvent}
        >
          <Title text={title} />
        </div>
        <CollapsableContainer
          containerClassName={classes.textContainer}
          maxHeight={100}
        >
          <div className={classes.clickableContainer} onClick={goToEvent}>
            <ParagraphText text={description} />
          </div>
        </CollapsableContainer>
        <div
          className={classes.locationContainer}
          onClick={goToEvent}
        >
          <LocationOnIcon className={classes.locationIcon} />
          <ParagraphText
            text={location}
            color={theme.palette.text.secondary}
          />
        </div>
        <div className={classes.dateContainer}>
          <div className={classes.timeContainer}>
            <PlayArrow className={classes.startIcon} />
            <div>
              <ParagraphText
                text={start.toDateString()}
                color={theme.palette.text.secondary}
              />
              <ParagraphText
                text={getLocalTime(start)}
                color={theme.palette.text.secondary}
              />
            </div>
          </div>
          <div className={classes.timeContainer}>
            <StopIcon className={classes.stopIcon} />
            <div>
              <ParagraphText
                text={end.toDateString()}
                color={theme.palette.text.secondary}
              />
              <ParagraphText
                text={getLocalTime(end)}
                color={theme.palette.text.secondary}
              />
            </div>
          </div>
        </div>
        {media && (
          <Slider
            media={media}
            screenSize={screenSize}
          />
        )}
      </div>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(EventCard);