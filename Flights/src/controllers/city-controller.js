const {StatusCodes}=require('http-status-codes');
const {CityService}=require('../services');
const {ErrorResponse,SuccessResponse}=require('../utils/common');

/**
  POST:/cities
  req.body:[name:'Delhi']
 */


async function createCity(req,res){
   try {
      const city=await CityService.createCity({
        name:req.body.name
      });
      SuccessResponse.success.data=city;
      return res.status(StatusCodes.CREATED).json(SuccessResponse);
   } catch (error) {
        ErrorResponse.error.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
   }
}

async function updateCity(req,res){
    try {
       const city=await CityService.updateCity(req.params.id,req.body);
       SuccessResponse.success.data=city;
       return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
         ErrorResponse.error.error=error;
         return res.status(error.statusCode).json(ErrorResponse);
    }
 }


 async function destroyCity(req,res){
    try {
       const response=await CityService.destroyCity(req.params.id);
       SuccessResponse.success.data=response;
       return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
         ErrorResponse.error.error=error;
         return res.status(error.statusCode).json(ErrorResponse);
    }
 }

 async function getCities(req,res){
    try {
       const cities=await CityService.getCities();
       SuccessResponse.success.data=cities;
       return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
         ErrorResponse.error.error=error;
         return res.status(error.statusCode).json(ErrorResponse);
    }
 }

 async function getCity(req,res){
    try {
       const city=await CityService.getCity(req.params.id);
       SuccessResponse.success.data=city;
       return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
         ErrorResponse.error.error=error;
         return res.status(error.statusCode).json(ErrorResponse);
    }
 }

module.exports={
    createCity,
    updateCity,
    destroyCity,
    getCities,
    getCity
}

