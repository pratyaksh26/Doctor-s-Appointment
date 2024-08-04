const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    speciality: {
        type: String,
        required: [true, "Speciality is required"],
    },
    contact: {
        type: String,
        required: [true, "Contact is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isUser: {
        type: Boolean,
        default: false,
    }
});
const docModel=mongoose.model('doctor',userSchema)

module.exports=docModel

