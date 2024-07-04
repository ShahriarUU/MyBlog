import customError from "../utils/customError.js";

//development error 
const devError = (res, error) => {

    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        stackTrace: error.stack,
        error: error

    });
};


const duplicateKeyErrorHandler = (error) => {
    const email = error.keyValue.email;
    const msg = `There is already a account with email ${email}. Please use another email!`;
    return new customError(msg, 400);
}


const validationErrorHandler = (error) => {

    const errors = Object.values(error.errors).map(val => val.message);
    const errorMessages = errors.join('. ');
    const msg = `Invalid input data: ${errorMessages}`;

    return new customError(msg, 400);
}


//production error handle

const prodError = (res, error) => {

    if (error.isOperational) {
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message
        })
    }
    else {
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong! Please try again later.'
        })
    }
}


//globle error 

export default (error, req, res, next) => {

    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        devError(res, error);

    }
    else if (process.env.NODE_ENV === 'production') {

        if (error.name === "ValidationError")
            error = validationErrorHandler(error);
        if (error.code === 11000)
            error = duplicateKeyErrorHandler(error);

        prodError(res, error)
    }
}