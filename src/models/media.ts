import { Types, Schema, Document, model } from 'mongoose';
import { EventDoc } from './event';
import { ObjectRefs } from '../utils/constants';

export interface MediaDoc extends Document {
  AR: number;
  event: Types.ObjectId | EventDoc;
}

const MediaSchema = new Schema({
  AR: {
    type: Number,
    required: true
  },
  event: {
    type: Types.ObjectId,
    required: true,
    ref: ObjectRefs.EVENT
  }
}, {
  timestamps: true
});

export default model<MediaDoc>(ObjectRefs.MEDIA, MediaSchema);

