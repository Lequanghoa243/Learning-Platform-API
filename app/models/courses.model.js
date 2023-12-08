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
        category: {
          type: String,
          required: true,
        },
        images: [
          {
            public_id: String,
            url: String,
          },
        ],
        tags: String,
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