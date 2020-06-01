import mongoose from 'mongoose';

export interface EventData extends mongoose.Document {
  title: string;
  description: string;
  community: mongoose.Types.ObjectId;
  owner: mongoose.Types.ObjectId;
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
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
});

export const EventModel = mongoose.model<EventData>('Event', EventSchema);
