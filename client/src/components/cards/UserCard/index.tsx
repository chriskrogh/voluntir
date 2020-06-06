import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import { Routes } from 'utils/constants';
import { User } from 'types/user';
import ParagraphText from 'components/typography/ParagraphText';

const styles = ( theme: Theme ) => createStyles( {
  container: {
    display: 'flex',
    alignItems: 'center',
    minWidth: `calc(50% - ${theme.spacing( 3 )}px)`,
    padding: theme.spacing( 1 ),
    margin: `0 ${theme.spacing( 2 )}px ${theme.spacing( 2 )}px 0`,
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing( 1 ),
    cursor: 'pointer'
  },
  pictureContainer: {
    marginRight: theme.spacing( 2 ),
    overflow: 'hidden',
    width: 40,
    height: 40,
    borderRadius: 20
  },
  picture: {
    maxHeight: '100%',
  }
} );

interface Props extends WithStyles<typeof styles> {
  className?: string;
  user: User;
}

function UserCard( { classes, className, user }: Props ) {
  const history = useHistory();

  const { name, picture, _id } = user;

  const goToProfile = () => {
    history.push( Routes.PROFILE + '?id=' + _id );
  }

  return (
    <div
      className={classnames( className, classes.container )}
      onClick={goToProfile}
    >
      <div className={classes.pictureContainer}>
        <img
          src={picture}
          className={classes.picture}
          alt={name}
        />
      </div>
      <ParagraphText text={name} />
    </div>
  );
}

export default withStyles( styles )( UserCard );