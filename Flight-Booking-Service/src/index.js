const express=require('express');
const {ServerConfig,Queue}= require('./config');
const apiRoutes=require('./routes');
const CRON=require('./utils/common/cron-jobs');

const app=express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api',apiRoutes);

app.listen(ServerConfig.PORT,async()=>{
    console.log(`Successfully started server on port:${ServerConfig.PORT}`);
    CRON();
    await Queue.connectQueue();
});
