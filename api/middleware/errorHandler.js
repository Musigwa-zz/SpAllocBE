const debug = require('debug');

const errorDebug = debug('app:error');
const { statusCodes, errorMessages } = require('../helpers/constants');

/**
 * @description This function wraps each request pipeline's middleware inside a [try{}catch(){}] block
 * @author MUSIGWA Pacifique
 * @param  {function} callback The middleware to be wrapped
 * @return  {function|any} The callback function or an error
 */
module.exports = (callback) => async (req, res, next) => {
  try {
    await callback(req, res, next)
  } catch (err) {
    let error = new Error();
    error.message = errorMessages().SERVER_ERROR
    error.status = statusCodes.INTERNAL_SERVER_ERROR;
    if (err && err.details) {
      ([error] = err.details);
      error.status = statusCodes.BAD_REQUEST;
    }
    errorDebug("what is the error", error, err);
    return res.status(error.status).json(error);
  }
}