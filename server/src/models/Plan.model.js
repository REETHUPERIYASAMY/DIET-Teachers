const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    training: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Training',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'in-progress'],
        default: 'pending'
    },
    notes: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Plan', PlanSchema);