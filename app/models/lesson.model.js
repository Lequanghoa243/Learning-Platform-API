const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            unique: true,
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
        sequence: {
            type: Number,
            unique: false,
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
