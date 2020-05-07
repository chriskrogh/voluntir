import mongoose from 'mongoose';

export interface CommunityData extends mongoose.Document {
    title: string;
    description: string;
    admins: string[];
}

const CommunitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
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

export const CommunityModel = mongoose.model<CommunityData>('Community', CommunitySchema);
