import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import /*type*/ { Event } from 'types/event';
import /*type*/ { ScreenSize } from 'types/theme';

import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PlayArrow from '@material-ui/icons/PlayArrow';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import StopIcon from '@material-ui/icons/Stop';
import CollapsableContainer from 'components/CollapseableContainer';
import Title from 'components/typography/Title';
import ParagraphText from 'components/typography/ParagraphText';
import SubText from 'components/typography/SubText';
import Slider from 'components/Slider';
import { Routes } from 'utils/constants';
import { getCommunityLogo } from 'utils/api/community';
import { getLocalTime } from 'utils/date';
import useScreenSize from 'utils/hooks/useScreenSize';

const styles = (theme: Theme) => createStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing(2),
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(1),
    },
  },
  contentContainer: {
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
  sliderContainer: {
    marginBottom: theme.spacing(1)
  },
  locationContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing(1),
    cursor: 'pointer'
  },
  dateContainer: {
    marginLeft: theme.spacing(4)
  },
  dateColumnsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: theme.spacing(2),
    cursor: 'pointer'
  },
  timesContainer: {
    display: 'flex',
    flex: 1
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  startIcon: {
    color: theme.palette.success.main,
    marginRight: theme.spacing(1),
    fontSize: 15
  },
  redIcon: {
    color: theme.palette.error.main,
    marginRight: theme.spacing(1),
    fontSize: 15
  },
  calendarIcon: {
    color: theme.palette.text.primary,
    marginRight: theme.spacing(1),
    fontSize: 15
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

  const isSameDay = start.toDateString() === end.toDateString();

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
        <div
          className={classes.locationContainer}
          onClick={goToEvent}
        >
          <LocationOnIcon className={classes.redIcon} />
          <SubText
            text={location}
            color={theme.palette.text.secondary}
          />
        </div>
        <div className={classes.dateColumnsContainer} onClick={goToEvent}>
          {isSameDay && (
            <div className={classes.timeContainer}>
              <CalendarTodayIcon className={classes.calendarIcon} />
              <SubText
                text={start.toDateString()}
                color={theme.palette.text.secondary}
              />
            </div>
          )}
          <div className={classes.timesContainer}>
            <div className={classes.timeContainer}>
              <PlayArrow className={classes.startIcon} />
              <div>
                {!isSameDay && (
                  <SubText
                    text={start.toDateString()}
                    color={theme.palette.text.secondary}
                  />
                )}
                <SubText
                  text={getLocalTime(start)}
                  color={theme.palette.text.secondary}
                />
              </div>
            </div>
            <div className={classes.timeContainer}>
              <StopIcon className={classes.redIcon} />
              <div>
                {!isSameDay && (
                  <SubText
                    text={end.toDateString()}
                    color={theme.palette.text.secondary}
                  />
                )}
                <SubText
                  text={getLocalTime(end)}
                  color={theme.palette.text.secondary}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={classes.textContainer}>
          <CollapsableContainer
            containerClassName={classes.textContainer}
            maxHeight={screenSize === ScreenSize.LG || screenSize === ScreenSize.XL
              ? 200
              : 100
            }
          >
            <div className={classes.clickableContainer} onClick={goToEvent}>
              <ParagraphText text={description} />
            </div>
          </CollapsableContainer>
        </div>
        {media && (
          <div className={classes.sliderContainer}>
            <Slider media={media} />
          </div>
        )}
      </div>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(EventCard);
