import mongoose from 'mongoose';
import { CommunityDoc } from './community';

export interface EventDoc extends mongoose.Document {
  title: string;
  description: string;
  community: mongoose.Types.ObjectId | CommunityDoc;
}

const EventSchema = new mongoose.Schema({
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
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Community'
  }
}, {
  timestamps: true
});

const EventModel = mongoose.model<EventDoc>('Event', EventSchema);

export default EventModel;