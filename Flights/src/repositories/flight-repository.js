const { Sequelize } = require('sequelize');

const CrudRepository = require('./crud-repository');
const { Flight, Airplane, Airport, City } = require('../models');
const db = require('../models');
const {addRowLockOnFlights}=require('./queries');

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }
    async updateRemainingSeats(flightId,seats,dec='true'){
        const transaction=await db.sequelize.transaction();
        await db.sequelize.query(addRowLockOnFlights(flightId));
        const flight = await Flight.findByPk(flightId);
        const numericSeats=parseInt(seats,10);
        if(dec==='true'){
            const response=await flight.decrement('totalSeats',{by: numericSeats},{transaction:transaction});
            await flight.reload();
            return response;
        }
        else{
            const response=await flight.increment('totalSeats',{by: numericSeats},{transaction:transaction});
            await flight.reload();
            return response;
        }
    }
    
    async getAllFlights(filter, sort) {
        try {
           const queryOptions = {
              where: filter,
              include: [
                 {
                    model: Airplane,
                    required: true,
                    as: 'airplaneDetail',
                 },
                 {
                    model: Airport,
                    required: true,
                    as: 'departureAirport',
                    on : {
                       col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirport.code"))
                    },
                    include: {
                       model: City,
                       required: true
                    }
                 },
                 {
                    model: Airport,
                    required: true,
                    as: 'arrivalAirport',
                    on : {
                       col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code"))
                    },
                    include: {
                       model: City,
                       required: true
                    }
                 }
              ],
           };
     
           // Add sort condition if provided and in the correct format
           if (sort && Array.isArray(sort) && sort.length > 0) {
              queryOptions.order = sort;
           } else if (sort) {
              console.warn('Invalid sort parameter:', sort);
           }
     
           const response = await Flight.findAll(queryOptions);
     
           return response;
        } catch (error) {
           console.error('Error in getAllFlights:', error);
           throw error; // Rethrow the error for further handling or logging
        }
     }     
     
   
}


module.exports = FlightRepository;