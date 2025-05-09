const CustomAPIError = require('./customeapi')
const {StatusCodes} = require('http-status-codes')
class Unauthenticated extends CustomAPIError {
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = Unauthenticated