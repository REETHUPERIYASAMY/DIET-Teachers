import mongoose from 'mongoose';

const TrainingSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
        trim: true
    },
    modules: [{
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Training = mongoose.model('Training', TrainingSchema);

export default Training;