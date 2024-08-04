const express=require('express')
const { loginCtrl, registerCtrl, docregisterCtrl,docctrl, appointmentctrl, bookingctrl } = require('../controllers/userCtrl')

const router=express.Router()
const docModel=require('../models/docModel')



//routes
router.post('/login',loginCtrl)
router.post('/register',registerCtrl)
router.post('/docregister',docregisterCtrl)
router.get('/doctors',docctrl)
router.get('/booking',bookingctrl)
router.post('/appointment',appointmentctrl)

router.get('/doctor/:id', async (req, res) => {
    try {
        const doctor = await docModel.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }
        res.status(200).json({ success: true, data: doctor });
    } catch (error) {
        console.error('Error fetching doctor:', error); // Detailed logging
        res.status(500).json({ success: false, message: 'Error fetching doctor', error: error.message });
    }
});

module.exports=router