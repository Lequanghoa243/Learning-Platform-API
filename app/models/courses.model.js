const mongoose = require('mongoose'); 

var courseSchema = new mongoose.Schema(
    {
        title: {
          type: String,
          required: true,
          trim: true,
        },
        slug: {
          type: String,
          required: true,
          unique: true,
          lowercase: true,
        },
        description: {
          type: String,
          required: true,
        },
        learningTime: {type: String},
        category: {
          type: mongoose.Schema.Types.ObjectId,  
          ref: 'Category',  
          required: true,
        },
        images:
         [],
        lessonlist: [{type: mongoose.Schema.Types.ObjectId, ref:"Lesson" }],
        NumberofLesson: {
          type: Number,
          default: 0,
        },
        ratings: [
          {
            star: Number,
            comment: String,
            postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          },
        ],
        totalrating: {
          type: String,
          default: 0,
        },
      },
      { timestamps: true }
); 


module.exports = mongoose.model('Course', courseSchema);