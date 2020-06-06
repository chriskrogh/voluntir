import { Types, Schema, Document, model } from 'mongoose';
import { ObjectRefs } from '../utils/constants';

export interface MediaDoc extends Document {
  AR: number;
}

const MediaSchema = new Schema( {
  AR: {
    type: Number,
    required: true
  },
  event: {
    type: Types.ObjectId,
    ref: ObjectRefs.EVENT
  }
}, {
  timestamps: true
} );

export default model<MediaDoc>( ObjectRefs.MEDIA, MediaSchema );

