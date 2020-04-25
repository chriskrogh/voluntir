import mongoose from 'mongoose';

export interface UserData extends mongoose.Document {
    id?: string;
    name: string;
    email: string;
    picture?: string;
};

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export const UserModel = mongoose.model<UserData>('User', UserSchema);
