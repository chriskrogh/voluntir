import mongoose from 'mongoose';

export interface UserData extends mongoose.Document {
    name: string;
    email: string;
    secret: string;
    picture?: string;
}

const UserSchema = new mongoose.Schema({
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
        type: String
    }
}, {
    timestamps: true
});

export const UserModel = mongoose.model<UserData>('User', UserSchema);
