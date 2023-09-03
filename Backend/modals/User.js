const mongoose = require('mongoose')
const { Schema } = mongoose;
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    Name:{
        type:String,
        Required:true,
    },
    Email:{
        type:String,
        Required:true,
        unique:[true,'Email already exit']
    },
    Password:{
        type:String,
        Required:true,
        minlength:5,
    },
    Date:{
        type:Date,
        default:Date.now,
    }
})





userSchema.pre("save",async function(next){
    if(this.isModified("Password")){
    this.Password = await bcrypt.hash(this.Password,10)
    }
    next();
})

module.exports = mongoose.model('UserData',userSchema)