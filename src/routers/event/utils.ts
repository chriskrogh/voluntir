import { Types } from 'mongoose';
import Community from '../../models/community';
import { UserDoc } from '../../models/user';

export const homeAggregateQuery = (joinedCommunityIds: Types.ObjectId[], user: UserDoc) => [
  {
    $match: {
      $or: [
        { community: { $in: joinedCommunityIds } },
        { attendees: { $elemMatch: { $in: user.following } } }
      ]
    }
  },
  {
    $match: {
      attendees: { $ne: user._id }
    }
  },
];

export const getJoinedCommunityIds = async (user: UserDoc) => {
  const joinedCommunities = await Community.find({
    $or: [{ members: user._id }, { admins: user._id }]
  });
  return joinedCommunities.map(community => community._id);
}
