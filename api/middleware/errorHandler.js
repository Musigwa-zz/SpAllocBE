const { statusCodes } = require('../helpers/constants');

const invalidUrl = (req, res) => {
  res.status(404).json({
    message: `invalid url: "${req.url}"`
  })
}

module.exports = (cb) => async (req, res, next) => {
  try {
    await cb(req, res, next)
  } catch (err) {
    let error = new Error('Internal server error');
    error.status = statusCodes.INTERNAL_SERVER_ERROR;
    if (err && err.details) {
      ([error] = err.details);
      error.status = statusCodes.BAD_REQUEST;
    }
    return res.status(error.status).json(error);
  }
}