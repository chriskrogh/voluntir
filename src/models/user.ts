/* eslint-disable @typescript-eslint/no-use-before-define */
import { Schema, Document, model, Model, Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { MediaDoc } from './media';
import Community from './community';
import Event from './event';
import { ObjectRefs } from '../utils/constants';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    unique: true,
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  secret: {
    type: String,
    required: true
  },
  picture: {
    type: Types.ObjectId
  },
  banner: {
    type: Types.ObjectId
  },
  tokens: [ {
    type: String,
    required: true
  } ],
  followers: [ {
    type: Types.ObjectId,
    required: true,
    ref: ObjectRefs.USER
  } ],
  following: [ {
    type: Types.ObjectId,
    required: true,
    ref: ObjectRefs.USER
  } ]
}, {
  timestamps: true
});

UserSchema.virtual('admin', {
  ref: ObjectRefs.COMMUNITY,
  localField: '_id',
  foreignField: 'admins'
})

UserSchema.virtual('member', {
  ref: ObjectRefs.COMMUNITY,
  localField: '_id',
  foreignField: 'members'
})

UserSchema.virtual('attendee', {
  ref: ObjectRefs.EVENT,
  localField: '_id',
  foreignField: 'attendees'
})

UserSchema.virtual('follower', {
  ref: ObjectRefs.USER,
  localField: '_id',
  foreignField: 'followers'
})

UserSchema.virtual('followee', {
  ref: ObjectRefs.USER,
  localField: '_id',
  foreignField: 'following'
})

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  delete userObject.secret;
  delete userObject.tokens;

  return userObject;
}

UserSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ id: this.id.toString() }, process.env.APP_SECRET);
  this.tokens = this.tokens.concat(token);
  await this.save();
  return token;
}

UserSchema.statics.validateSecret = async (user: UserDoc, secret: string) => {
  const isMatch = await bcrypt.compare(secret, user.secret);
  if (!isMatch) {
    throw new Error('Unable to login');
  }
  return user;
}

UserSchema.statics.findByCredentials = async (email: string, secret: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error('Unable to login');
  }
  return await UserModel.validateSecret(user, secret);
};

UserSchema.pre('save', async function (next) {
  const user = this as UserDoc;
  if (user.isModified('secret')) {
    user.secret = await bcrypt.hash(user.secret, 8);
  }
  next();
});

UserSchema.pre('remove', async function (next) {
  // remove from attendees
  const events = await Event.find({ attendees: this._id });
  events.forEach(async (event) => {
    event.attendees.pull(this._id);
    await event.save();
  });
  // remove from admins
  const adminCommunities = await Community.find({ admins: this._id });
  adminCommunities.forEach(async (community) => {
    community.admins.pull(this._id);
    await community.save();
  });
  // remove from members
  const memberCommunities = await Community.find({ members: this._id });
  memberCommunities.forEach(async (community) => {
    community.members.pull(this._id);
    await community.save();
  });
  // remove from followers
  const usersIFollow = await UserModel.find({ followers: this._id });
  usersIFollow.forEach(async (user) => {
    user.followers.pull(this._id);
    await user.save();
  });
  next();
});

export interface UserDoc extends Document {
  name: string;
  email: string;
  secret: string;
  picture?: Types.ObjectId | MediaDoc;
  banner?: Types.ObjectId | MediaDoc;
  tokens: string[];
  followers: Types.Array<Types.ObjectId> | Types.Array<UserDoc>;
  following: Types.Array<Types.ObjectId> | Types.Array<UserDoc>;
  generateAuthToken: () => Promise<string>;
}

interface User extends Model<UserDoc> {
  findByCredentials: (email: string, secret: string) => Promise<UserDoc>;
  validateSecret: (user: UserDoc, secret: string) => Promise<UserDoc>;
}

const UserModel: User = model<UserDoc, User>(ObjectRefs.USER, UserSchema);

export default UserModel;
