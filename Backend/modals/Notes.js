const mongoose = require('mongoose')
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        Required:true,
        ref:'NoteData'
    },
    Title:{
        type:String,
        Required:true,
    },
    Description:{
        type:String,
        Required:true,
    },
    Tag:{
        type:String,
        default:'General'
    },
    Date:{
        type:Date,
        default:Date.now,
    }
})

module.exports = mongoose.model('NoteData',NotesSchema)