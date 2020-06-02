import { Types, Schema, Document, model } from 'mongoose';
import { CommunityDoc } from './community';
import { MediaDoc } from './media';
import { ObjectRefs } from '../utils/constants';

export interface EventDoc extends Document {
  title: string;
  description: string;
  community: Types.ObjectId | CommunityDoc;
  media: Types.ObjectId | MediaDoc;
}

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  community: {
    type: Types.ObjectId,
    required: true,
    ref: ObjectRefs.COMMUNITY
  },
  media: [{
    type: Types.ObjectId,
    ref: ObjectRefs.MEDIA
  }]
}, {
  timestamps: true
});

const EventModel = model<EventDoc>(ObjectRefs.EVENT, EventSchema);

export default EventModel;