import mongoose from 'mongoose';

export interface CommunityData extends mongoose.Document {
    title: string;
    description: string;
    admins: string[];
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
}, {
    timestamps: true
});

export const CommunityModel = mongoose.model<CommunityData>('Community', CommunitySchema);
