import mongoose from 'mongoose';

export interface CommunityData extends mongoose.Document {
  title: string;
  description: string;
  admins?: mongoose.Schema.Types.ObjectId[];
}

const CommunitySchema = new mongoose.Schema({
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
  admins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

export const CommunityModel = mongoose.model<CommunityData>('Community', CommunitySchema);
