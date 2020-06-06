import { Types, Schema, Document, model } from 'mongoose';
import { MediaDoc } from './media';
import { UserDoc } from './user';
import { ObjectRefs } from '../utils/constants';

export interface CommunityDoc extends Document {
  name: string;
  description: string;
  logo?: Types.ObjectId | MediaDoc;
  banner?: Types.ObjectId | MediaDoc;
  admins: Types.Array<Types.ObjectId> | Types.Array<UserDoc>;
  members: Types.Array<Types.ObjectId> | Types.Array<UserDoc>;
}

const CommunitySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  logo: {
    type: String
  },
  banner: {
    type: String
  },
  admins: [ {
    type: Types.ObjectId,
    required: true,
    ref: ObjectRefs.USER
  } ],
  members: [ {
    type: Types.ObjectId,
    required: true,
    ref: ObjectRefs.USER
  } ]
}, {
  timestamps: true
});

CommunitySchema.virtual('event', {
  ref: ObjectRefs.EVENT,
  localField: '_id',
  foreignField: 'community'
})

const CommunityModel = model<CommunityDoc>(ObjectRefs.COMMUNITY, CommunitySchema);

export default CommunityModel;
