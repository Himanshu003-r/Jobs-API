const CustomAPIError = require('./customeapi')
const BadRequest = require('./badreq')
const Unauthentication = require('./unauthentication')
const NotFoundError = require('./notfound')
module.exports = {
    CustomAPIError,
    BadRequest,
    Unauthentication,
    NotFoundError
}