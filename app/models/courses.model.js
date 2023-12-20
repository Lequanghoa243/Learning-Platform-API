const mongoose = require('mongoose'); 

var courseSchema = new mongoose.Schema(
    {
        title: {
          type: String,
          required: true,
          unique: true,
          index: true,
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
          type: String,  
          ref: 'Category',  
          required: true,
        },
        images:
         [
          {
            public_id: String,
            url: String,
          },
         ],
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