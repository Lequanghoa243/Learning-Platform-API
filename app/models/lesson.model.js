const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        videoURL: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        sequence: {
            type: Number,
            required: true,
        },

        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',  
            required: true,
        },
    },
    { timestamps: true }
);


module.exports = mongoose.model('Lesson', lessonSchema);
