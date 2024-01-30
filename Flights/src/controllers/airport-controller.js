const {StatusCodes}=require('http-status-codes');
const {AirportService}=require('../services');
const {ErrorResponse,SuccessResponse}=require('../utils/common');

async function createAirport(req,res){
    try{
        const airport= await AirportService.createAirport({
            name:req.body.name,
            code:req.body.code,
            address:req.body.address,
            cityId:req.body.cityId
        });
        SuccessResponse.success.data=airport;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch(error){
        ErrorResponse.error.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getAirports(req,res){
    try {
        const airports=await AirportService.getAirports();
        SuccessResponse.success.data=airports;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getAirport(req,res){
    try {
        const response=await AirportService.getAirport(req.params.id);
        SuccessResponse.success.data=response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}


async function destroyAirport(req,res){
    try {
        const response=await AirportService.destroyAirport(req.params.id);
        SuccessResponse.success.data=response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}


async function updateAirport(req,res){
    try {
        const response=await AirportService.updateAirport(req.params.id,req.body);
        SuccessResponse.success.data=response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports={
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}