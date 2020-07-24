import { Types, Schema, Document, model } from 'mongoose';
import { GeoJSON } from '../types/location';
import { CommunityDoc } from './community';
import { UserDoc } from './user';
import Media from './media';
import blobService from '../utils/blobstorage';
import { ObjectRefs } from '../utils/constants';

export interface EventDoc extends Document {
  title: string;
  description: string;
  location: GeoJSON;
  start: Date;
  end: Date;
  community: Types.ObjectId | CommunityDoc;
  attendees: Types.Array<Types.ObjectId> | Types.Array<UserDoc>;
}

const GeoSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  coordinates: {
    type: [ Number ],
    index: '2dsphere',
    required: true
  }
});

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
  location: GeoSchema,
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
  attendees: [{
    type: Types.ObjectId,
    required: true,
    ref: ObjectRefs.USER
  }]
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
    await blobService.deleteBlob('media', item._id + '.jpg');
    await Media.findByIdAndDelete(item._id);
  });
  next();
});

const EventModel = model<EventDoc>(ObjectRefs.EVENT, EventSchema);

export default EventModel;
