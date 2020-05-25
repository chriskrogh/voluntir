import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { User } from 'types/user';
import UserCard from 'components/cards/UserCard';

const styles = (theme: Theme) => createStyles({
  eventContainer: {
    margin: `0 ${theme.spacing(2)}px`,
  },
  firstChild: {
    marginTop: 0
  }
});

interface Props extends WithStyles<typeof styles> {
  users: User[];
}

function UserList({classes, users}: Props) {
  return (
    <div className={classes.eventContainer}>
      {users.map((user, index) => (
        <UserCard
          key={user._id}
          user={user}
          className={index === 0 ? classes.firstChild : undefined}
        />
      ))}
    </div>
  );
}

export default withStyles(styles)(UserList);