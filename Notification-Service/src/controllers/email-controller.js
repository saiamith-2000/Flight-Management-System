const {StatusCodes}=require('http-status-codes');
const {SuccessResponse,ErrorResponse}=require('../utils/common');





async function createTicket(req,res){
    try {
        const response=EmailService.createTicket({
            recipientEmail:req.body.mailTo,
            subject:req.body.subject,
            content:req.body.text
        });
        SuccessResponse.success.data=response;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports={
    createTicket
}