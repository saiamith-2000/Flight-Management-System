const CRUDRepository=require('./crud-repository');

const { Airport }=require('../models');


class AirportRepository extends CRUDRepository{
    constructor(){
        super(Airport);
    }
}

module.exports=AirportRepository;