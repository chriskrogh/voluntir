import type { WithStyles, Theme } from '@material-ui/core/styles';

import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
export const BANNER_HEIGHT = 240;
export const PICTURE_SIZE = BANNER_HEIGHT / 2;

const styles = (theme: Theme) => createStyles({
  bannerPictureContainer: {
    display: 'flex',
    height: BANNER_HEIGHT,
    marginBottom: theme.spacing(1),
    position: 'relative'
  },
  banner: {
    width: '100%',
    height: BANNER_HEIGHT - PICTURE_SIZE / 2,
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
  },
  pictureWrapper: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    position: 'absolute'
  },
  pictureContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: PICTURE_SIZE,
    height: PICTURE_SIZE,
    marginLeft: theme.spacing(2),
    borderRadius: PICTURE_SIZE / 2,
    overflow: 'hidden'
  },
  picture: {
    maxHeight: '100%'
  },
});

interface Props extends WithStyles<typeof styles> {
  banner?: string;
  picture?: string;
}

function BannerPicture({ classes, banner, picture }: Props) {
  return (
    <div className={classes.bannerPictureContainer}>
      <div
        className={classes.banner}
        style={{ backgroundImage: `url(${banner})` }}
      />
      <div className={classes.pictureWrapper}>
        <div className={classes.pictureContainer}>
          <img
            src={picture}
            className={classes.picture}
            alt="user"
          />
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(BannerPicture);
