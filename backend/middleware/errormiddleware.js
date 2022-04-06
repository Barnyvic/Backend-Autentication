// Middleware is a function that runs in between the request and the response

//import { Request, Response, NextFunction } from 'express';
const errorHandler = (err, req, res, next) => {
  //status code
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
    // if NODE_ENV is production, then hide the stack trace
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
