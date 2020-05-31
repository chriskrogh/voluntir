import mongoose from 'mongoose';

export interface CommunityDoc extends mongoose.Document {
  title: string;
  description: string;
  logo?: string;
  banner?: string;
  admins: mongoose.Schema.Types.ObjectId[];
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
  logo: {
    type: String
  },
  banner: {
    type: String
  },
  admins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

const CommunityModel = mongoose.model<CommunityDoc>('Community', CommunitySchema);

export default CommunityModel;
