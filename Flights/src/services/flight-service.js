const {FlightRepository}=require('../repositories');
const {StatusCodes}=require('http-status-codes');
const { AppError } = require('../utils/errors/app-error');

const {Op}=require('sequelize');

const flightRepository=new FlightRepository();

async function createFlight(data){
    try{
       const flight=await flightRepository.create(data);
       return flight;
    } catch(error){
        if(error.name=='SequelizeValidationError'){
            let explaination=[];
            error.errors.forEach((err) => {
                explaination.push(err.message);
            })
            throw new AppError(explaination,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateFlight(id,data){
    try {
        const response=await flightRepository.update(id,data);
        let flightupdated=await flightRepository.get(id);
        return response;
    } catch (error) {
        if(error.name=='SequelizeValidationError'){
            let explaination=[];
            error.errors.forEach((err) => {
                explaination.push(err.message);
            })
            throw new AppError(explaination,StatusCodes.BAD_REQUEST);
        }
        else if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('Flight requested is not found',StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot update the requested flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id){
    try {
        const flight=await flightRepository.get(id);
        return flight;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
         throw new AppError('Flight requested is not found',StatusCodes.NOT_FOUND);
        }
        throw new AppError('Can\'t find the flight',StatusCodes.BAD_REQUEST);
    }
}

async function updateSeats(data){
    try {
        const response=await flightRepository.updateRemainingSeats(data.flightId,data.seats,data.dec);
        return response;
    } catch (error) {
        console.log(error);
        throw new AppError('Can\'t update the data of the flight',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query){
    let customFilter={};
    let sortFilter={};
    const endingTripTime = " 23:59:00";
    if(query.trips){
         [departureAirportId,arrivalAirportId]=query.trips.split("-");
         if(departureAirportId==arrivalAirportId){
            throw new AppError('Arrival and Departure Can\'t be same',StatusCodes.BAD_REQUEST);
         }
         customFilter.departureAirportId=departureAirportId;
         customFilter.arrivalAirportId=arrivalAirportId;
    }
    if(query.price){
        [minPrice,maxPrice=2000]=query.price.split("-");
        customFilter.price={
            [Op.between]: [minPrice,maxPrice]
        }
    }
    if(query.travellers){
        customFilter.totalSeats={
            [Op.gte]: query.travellers
        }
    }
    if(query.tripDate) {
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
        }
    }
    if(query.sort){
        const params=query.sort.split(",");
        const sortFilters=params.map((param)=>param.split('_'));
        sortFilter = sortFilters;
    }
    try {
        const flights=await flightRepository.getAllFlights(customFilter,sortFilter);
        return flights;   
    } catch (error) {
        throw new AppError('Can\'t fetch data of all flights',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyFlight(id){
    try {
        const flight=await flightRepository.destroy(id);
        return flight;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
         throw new AppError('Flight requested is not found',StatusCodes.NOT_FOUND);
        }
        throw new AppError('Can\'t destry the flight',StatusCodes.BAD_REQUEST);
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