const express=require('express');
const amqplib=require('amqplib');
const {EmailService}=require('./services');
async function connectQueue(){
    try {
        const connection=await amqplib.connect("amqp://localhost");
        const channel=await connection.createChannel();
        await channel.assertQueue("noti-queue");
        channel.consume("noti-queue",async (data)=>{
            const object = JSON.parse(`${Buffer.from(data.content.toString())}`);
            console.log('Received message:', object);
            await EmailService.sendEmail("airlinenotificationservices@gmail.com",object.recipientEmail,object.subject,object.text);
            channel.ack(data);
        });
    } catch (error) {
        
    }
}


const {ServerConfig,Logger}= require('./config');
const apiRoutes=require('./routes');
const mailSender = require('./config/email-config');


const app=express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api',apiRoutes);

app.listen(ServerConfig.PORT,async()=>{
    console.log(`Successfully started server on port:${ServerConfig.PORT}`);
    await connectQueue();
    console.log("queue is up");
});
