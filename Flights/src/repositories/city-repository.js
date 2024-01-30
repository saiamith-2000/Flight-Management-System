const CRUDRepository=require('./crud-repository');

const { City }=require('../models');

class CityRepository extends CRUDRepository{
    constructor(){
        super(City);
    }
}

module.exports=CityRepository;