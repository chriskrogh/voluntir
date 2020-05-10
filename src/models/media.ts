import mongoose from 'mongoose';

export interface MediaDoc extends mongoose.Document {
    event: mongoose.Schema.Types.ObjectId;
}

const MediaSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Event'
    }
}, {
    timestamps: true
});

MediaSchema.methods.toJSON = function () {
    const mediaObject = this.toObject();

    delete mediaObject.buffer;

    return mediaObject;
}

export default mongoose.model<MediaDoc>('Media', MediaSchema);

