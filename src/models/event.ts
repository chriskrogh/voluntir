import { Types, Schema, Document, model } from 'mongoose';
import { CommunityDoc } from './community';
import { MediaDoc } from './media';

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
    ref: 'Community'
  },
  media: [{
    type: Types.ObjectId,
    ref: 'Media'
  }]
}, {
  timestamps: true
});

const EventModel = model<EventDoc>('Event', EventSchema);

export default EventModel;