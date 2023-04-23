const express = require('express')

/**
 * Global error handler that catches all errors and sends them to the client.
 * Maybe I should use it only on development environment.
 * @param {Error} err 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {function} next
 */
const errorHandler = (err, req, res, next) => {
    // err.status is set on the services
    res.status(err.status || 500).send({message: err.message})
}

module.exports = errorHandler; 