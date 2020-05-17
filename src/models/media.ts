import mongoose from 'mongoose';

export interface MediaDoc extends mongoose.Document {
    AR: number;
}

const MediaSchema = new mongoose.Schema({
    AR: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model<MediaDoc>('Media', MediaSchema);

