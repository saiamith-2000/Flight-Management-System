const express=require('express');

const { EmailController }=require('../../controllers');
const { EmailService } = require('../../services');

const router=express.Router();

router.post('/send',EmailService.sendEmail);
router.post('/ticket',EmailController.createTicket);



module.exports=router;