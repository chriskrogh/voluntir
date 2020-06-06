import { Types, Schema, Document, model } from 'mongoose';
import { CommunityDoc } from './community';
import { UserDoc } from './user';
import Media from './media';
import blobService from '../utils/blobstorage';
import { ObjectRefs, CONTAINER_NAME } from '../utils/constants';

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

EventSchema.pre('remove', async function(next) {
  const media = await Media.find({ event: this._id });
  media.forEach(async (item) => {
    await blobService.deleteBlob(CONTAINER_NAME, item._id + '.jpg');
    await Media.findByIdAndDelete(item._id);
  });
  next();
});

const EventModel = model<EventDoc>(ObjectRefs.EVENT, EventSchema);

export default EventModel;