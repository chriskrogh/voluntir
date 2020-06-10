import React from 'react';
import /*type*/ { WithStyles } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { User } from 'types/user';
import UserCard from 'components/cards/UserCard';

const numUsersInRow = 2;

const styles = () => createStyles({
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  },
  firstChild: {
    marginTop: 0
  },
  lastInRow: {
    marginRight: 0
  }
});

interface Props extends WithStyles<typeof styles> {
  users: User[];
}

function UserList({ classes, users }: Props) {
  return (
    <div className={classes.list}>
      {users.map((user, index) => (
        <UserCard
          key={user._id}
          user={user}
          className={classnames(
            { [classes.firstChild] : index === 0 },
            { [classes.lastInRow] : index % numUsersInRow !== 0 }
          )}
        />
      ))}
    </div>
  );
}

export default withStyles(styles)(UserList);
