import mongoose from 'mongoose';

export interface CommunityDoc extends mongoose.Document {
  name: string;
  description: string;
  logo?: mongoose.Types.ObjectId;
  banner?: mongoose.Types.ObjectId;
  admins: mongoose.Types.ObjectId[];
  events?: mongoose.Types.ObjectId[];
}

const CommunitySchema = new mongoose.Schema({
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
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }],
  events: [{
    type: mongoose.Types.ObjectId,
    ref: 'Event'
  }]
}, {
  timestamps: true
});

const CommunityModel = mongoose.model<CommunityDoc>('Community', CommunitySchema);

export default CommunityModel;
