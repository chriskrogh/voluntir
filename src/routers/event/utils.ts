import { Types } from 'mongoose';
import Community from '../../models/community';
import { UserDoc } from '../../models/user';

const NUM_EVENTS_IN_PAGE = 10;

export const homeQueryAggregate = (joinedCommunityIds: Types.ObjectId[], user: UserDoc) => [
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

export const homePaginateAggregate = (page: number) => [
  {
    $skip: page > 0 ? ((page - 1) * NUM_EVENTS_IN_PAGE) : 0
  },
  {
    $limit: NUM_EVENTS_IN_PAGE
  }
]

export const getJoinedCommunityIds = async (user: UserDoc) => {
  const joinedCommunities = await Community.find({
    $or: [{ members: user._id }, { admins: user._id }]
  });
  return joinedCommunities.map(community => community._id);
}
