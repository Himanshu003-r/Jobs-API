const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('./customeapi')

class NotFoundError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.StatusCodes = StatusCodes.NOT_FOUND
    }
}

module.exports = NotFoundError