const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
 name: {
    type:String,
    required: [true,"name is req"]
 },

 email: {
    type:String,
    required: [true,"email is req"]
 },

 password: {
    type:String,
    required: [true,"password is req"]
 },
 isadmin:{
    type:Boolean,
    default:false
 },
 isuser:{
    type:Boolean,
    default:false
 }
})

const userModel=mongoose.model('user',userSchema)

module.exports=userModel