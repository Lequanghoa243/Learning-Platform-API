const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var courseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        unique:true,
    },
   slug:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
   NumberofLesson:{
        type:Number,
        required:true,
    },
    Category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    imgages:{
        type: Array,
    },
    ratings:{
        star:Number,
        postBy: {type:mongoose.Schema.Types.ObjectId, ref: "User"},
    }
},
{
    timestamps: true,
}
); 

//Export the model
module.exports = mongoose.model('Course', courseSchema);