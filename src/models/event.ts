import { Types, Schema, Document, model } from 'mongoose';
import { CommunityDoc } from './community';
import { UserDoc } from './user';
import { ObjectRefs } from '../utils/constants';

export interface EventDoc extends Document {
  title: string;
  description: string;
  location: string;
  start: Date;
  end: Date;
  community: Types.ObjectId | CommunityDoc;
  attendees: Types.Array<Types.ObjectId> | Types.Array<UserDoc>;
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
  location: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  community: {
    type: Types.ObjectId,
    required: true,
    ref: ObjectRefs.COMMUNITY
  },
  attendees: [ {
    type: Types.ObjectId,
    required: true,
    ref: ObjectRefs.USER
  } ]
}, {
  timestamps: true
});

EventSchema.virtual('media', {
  ref: ObjectRefs.MEDIA,
  localField: '_id',
  foreignField: 'event'
})

const EventModel = model<EventDoc>(ObjectRefs.EVENT, EventSchema);

export default EventModel;