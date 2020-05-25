import React from 'react';
import { User } from 'types/user';

interface Props {
  className?: string;
  user: User;
}

function UserCard({ className, user }: Props) {
  return (
    <div className={className}>
      {user.name}
    </div>
  );
}

export default UserCard;