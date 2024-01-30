const express=require('express');

const { InfoController }=require('../../controllers');
const mailRoutes=require('./mail-routes');

const router=express.Router();

router.get('/info',InfoController.info);
router.use('/mail',mailRoutes);

module.exports=router;