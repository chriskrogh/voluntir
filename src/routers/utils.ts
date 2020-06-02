import { Types } from 'mongoose';
import { CommunityDoc } from '../models/community';

export const isAdmin = (userId: Types.ObjectId, community: CommunityDoc) => {
  for(const adminId of community.admins) {
    if(adminId.equals(userId)) {
      return true;
    }
  }
  return false;
}