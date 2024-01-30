const {TicketRepository}=require('../repositories');
const {EmailConfig}=require('../config');
const { AppError } = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');
const ticketRepository=new TicketRepository();

async function sendEmail(mailFrom, mailTo, subject, text) {
    try {
        const response = await EmailConfig.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: subject,
            text: text
        });
        return response;
    } catch(error) {
        console.log(error);
        throw error;
    }
}

async function createTicket(data){
     try {
        const response=await ticketRepository.create(data);
        return response;
     } catch (error) {
        console.log(error);
        throw new AppError('could not mail the user',StatusCodes.INTERNAL_SERVER_ERROR);
     }
}

async function getPendingEmails(data){
    try {
       const response=await ticketRepository.getPendingTickets();
       return response;
    } catch (error) {
       console.log(error);
       throw new AppError('could not mail the user',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    sendEmail,
    createTicket,
    getPendingEmails
}