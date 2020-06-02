import { Types, Schema, Document, model } from 'mongoose';
import { ObjectRefs } from '../utils/constants';

export interface CommunityDoc extends Document {
  name: string;
  description: string;
  logo?: Types.ObjectId;
  banner?: Types.ObjectId;
  admins: Types.ObjectId[];
  events?: Types.ObjectId[];
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
  admins: [{
    type: Types.ObjectId,
    ref: ObjectRefs.USER
  }],
  events: [{
    type: Types.ObjectId,
    ref: ObjectRefs.EVENT
  }]
}, {
  timestamps: true
});

const CommunityModel = model<CommunityDoc>(ObjectRefs.COMMUNITY, CommunitySchema);

export default CommunityModel;
