const {StatusCodes}=require('http-status-codes');
const {FlightService}=require('../services');
const {ErrorResponse,SuccessResponse}=require('../utils/common');

async function createFlight(req,res){
    try{
        const flight= await FlightService.createFlight({
            flightNumber:req.body.flightNumber,
            airplaneId:req.body.airplaneId,
            departureAirportId:req.body.departureAirportId,
            arrivalAirportId:req.body.arrivalAirportId,
            arrivalTime:req.body.arrivalTime,
            departureTime:req.body.departureTime,
            price:req.body.price,
            boardingGate:req.body.boardingGate,
            totalSeats:req.body.totalSeats
        });
        SuccessResponse.success.data=flight;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch(error){
        ErrorResponse.error.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function updateFlight(req,res){
    try {
        const response=await FlightService.updateFlight(req.params.id,req.body);
        SuccessResponse.success.data=response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}


async function getAllFlights(req,res){
    try {
        const flights=await FlightService.getAllFlights(req.query);
        SuccessResponse.success.data=flights;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getFlight(req,res){
    try {
        const flight=await FlightService.getFlight(req.params.id);
        SuccessResponse.success.data=flight;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function destroyFlight(req,res){
    try {
        const flight=await FlightService.destroyFlight(req.params.id);
        SuccessResponse.success.data=flight;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function updateSeats(req,res){
    try {
        const response=await FlightService.updateSeats({
            flightId:req.body.flightId,
            seats:req.body.seats,
            dec:req.body.dec
        });
        SuccessResponse.success.data=response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}


module.exports={
    createFlight,
    updateFlight,
    getAllFlights,
    getFlight,
    updateSeats,
    destroyFlight
}