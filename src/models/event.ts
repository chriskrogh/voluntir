import mongoose from 'mongoose';

export interface EventData extends mongoose.Document {
    title: string;
    description: string;
    community: mongoose.Schema.Types.ObjectId;
    owner: mongoose.Schema.Types.ObjectId;
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
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Community'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
});

export const EventModel = mongoose.model<EventData>('Event', EventSchema);
