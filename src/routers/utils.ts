import { Types } from 'mongoose';
import { CommunityDoc } from '../models/community';

export const isAdmin = (userId: Types.ObjectId, community: CommunityDoc) => {
  const admins = community.admins as Types.ObjectId[];
  for(const adminId of admins) {
    if(adminId.equals(userId)) {
      return true;
    }
  }
  return false;
}
