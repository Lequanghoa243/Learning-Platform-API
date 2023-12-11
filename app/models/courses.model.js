const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
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
          {
            url: String,
          },
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

//Export the model
module.exports = mongoose.model('Course', courseSchema);