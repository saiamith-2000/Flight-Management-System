const {CityRepository}=require('../repositories');
const {StatusCodes}=require('http-status-codes');
const { AppError } = require('../utils/errors/app-error');

const cityRepository=new CityRepository();

async function createCity(data){
try {
    const city=await cityRepository.create(data);
    return city;
} catch (error) {
    console.log(error);
    if(error.name=='SequelizeUniqueConstraintError'){
        let explaination=[];
        error.errors.forEach((err) => {
            explaination.push('City '+err.message);
        })
        throw new AppError(explaination,StatusCodes.BAD_REQUEST);
    }
    throw new AppError('Can\'t create new city',StatusCodes.INTERNAL_SERVER_ERROR);
}
}

async function updateCity(id,data){
    try {
        const response=await cityRepository.update(id,data);
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
            throw new AppError('City is not found',StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot update the requested city', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function destroyCity(id){
    try {
        const response=await cityRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('City requested is not found',StatusCodes.NOT_FOUND);
           }
           throw new AppError('Can\'t find the city',StatusCodes.INTERNAL_SERVER_ERROR); 
    }
}

async function getCities(){
    try {
        const cities=await cityRepository.getAll();
        return cities;
    } catch (error) {
        throw new AppError('Can\'t find all the cities',StatusCodes.INTERNAL_SERVER_ERROR); 
    }
}

async function getCity(id){
    try {
        const city=await cityRepository.get(id);
        return city;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('City requested is not found',StatusCodes.NOT_FOUND);
           }
           throw new AppError('Can\'t find the city',StatusCodes.BAD_REQUEST);
    }
}

module.exports={
    createCity,
    updateCity,
    destroyCity,
    getCities,
    getCity
}