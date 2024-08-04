const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({
    docname:{
        type:String,
        required: [true, "docname is required"],
    },
    username:{
        type:String,
        required: [true, "username is required"],
        
    },
    contact:{
        type:String,
        required: [true, "contact is required"],
    },
    date:{
        type:String,
        required: [true, "date is required"],
    },
    time:{
        type:String,
        required: [true, "time is required"],
    }

});
const appointmentModel=mongoose.model('appointment',userSchema)

module.exports=appointmentModel

