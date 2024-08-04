const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const docModel=require('../models/docModel')
const appointmentModel=require('../models/appointmentModel')


const registerCtrl = async (req, res) => {
    try {
        console.log('Register request received:', req.body);
        
        // Check if user already exists
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            console.log('User already exists:', req.body.email);
            return res.status(200).send({ message: 'User already exists', success: false });
        }

        // Hash the password
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        // Create a new user
        const newUser = new userModel(req.body);
        await newUser.save();
        console.log('New user registered:', newUser);

        res.status(201).send({ message: 'Registered successfully', success: true });
    } catch (error) {
        console.error('Error in registerCtrl:', error);
        res.status(500).send({ success: false, error: error.message });
    }
};

const loginCtrl =async (req, res) => {
    const myuser=await userModel.findOne({email:req.body.email})
    try {
        if(!myuser){
            return res.status(200).send({message:"user not found",success : false})
        }
        const ismatch=await bcrypt.compare(req.body.password,myuser.password)
        if(!ismatch){
            return res.status(200).send({message:"password is incorrect",success : false})
        }
        // const token=jwt.sign({id:userModel.id},process.env.JWT_SECRET,{expiresIn:'1d'})
         res.status(200).send({message:"logging",success : true,data:myuser,})


    } catch (error) {
        console.log(error)
        res.status(500).send({message:"error in login"})
    }
};
const docregisterCtrl = async (req, res) => {
    try {
        console.log('Register request received:', req.body);
        
        // Check if user already exists
        const existingdoc = await docModel.findOne({ email: req.body.email });
        if (existingdoc) {
            console.log('User already exists:', req.body.email);
            return res.status(200).send({ message: 'User already exists', success: false });
        }

        // Hash the password
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        // Create a new user
        const newDoc = new docModel(req.body);
        await newDoc.save();
        console.log('New user registered:', newDoc);

        res.status(201).send({ message: 'Registered successfully', success: true });
    } catch (error) {
        console.error('Error in docregisterCtrl:', error);
        res.status(500).send({ success: false, error: error.message });
    }
};

const docctrl= async(req,res)=>{
    try {
        const doctor=await docModel.find()
        res.status(200).json({ success: true, data: doctor });
    } catch (error) {
        console.log(error)
    }
}
const appointmentctrl = async (req, res) => {
    try {
        const { docname, username, contact, date, time } = req.body;

       

        const newAppointment = new appointmentModel({ docname, username, contact, date, time });
        await newAppointment.save();

        res.status(200).send({ message: "Booked successfully!", success: true });
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).send({ success: false, message: 'Error creating appointment', error: error.message });
    }
};

const bookingctrl=async(req,res)=>{
    try {
        const booking =await appointmentModel.find()
        res.status(200).send({success:true,data:booking})

    } catch (error) {
        console.log(error)
        
    }
}
module.exports = { loginCtrl, registerCtrl,docregisterCtrl,docctrl ,appointmentctrl,bookingctrl};
