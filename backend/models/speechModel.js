// models/Speech.js
const mongoose = require('mongoose');

const SpeechSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    audioUrl: {
        type: String,
        required: true
    },
    transcription: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Speech', SpeechSchema);
