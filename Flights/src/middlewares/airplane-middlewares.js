const {StatusCodes}=require('http-status-codes');

const { ErrorResponse }=require('../utils/common');
const { AppError } = require('../utils/errors/app-error');

function validateCreateRequest(req, res,next){
    if(!req.body.modelNumber){
          ErrorResponse.message="Something went wrong due to creation of plane";
          ErrorResponse.error=new AppError(['Model number found in incorrect form'],StatusCodes.BAD_REQUEST);
          return res.status(StatusCodes.BAD_REQUEST).json({ErrorResponse});
    }
    next();
}

function validateUpdateRequest(req,res,next){
    if(!req.body.modelNumber && !req.body.capacity){
        ErrorResponse.message="Something went wrong while updating plane";
        ErrorResponse.error=new AppError(['Model number and capacity not found in incoming form'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({ErrorResponse});
  }
  next();
}

module.exports={
    validateCreateRequest,
    validateUpdateRequest
}