const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    Email : {type:String,required:true},
    Password : {type:String,required:true},
    Comfirm_Password : {type:String,required:true},
    Phone_no : {type:Number},
    T_and_C : {type:Boolean, required:true},
    language: { type: String, default: 'ENGLISH' },
    Designation: { type: String },
    otp: {type: String}
},{timestamps:true})

const userModel = mongoose.model('user',userSchema)


module.exports = userModel
