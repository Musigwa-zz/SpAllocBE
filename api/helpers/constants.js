const statusCodes = require("http-status-codes");

module.exports = {
  statusCodes,
  errorMessages: (context = 'station') => ({
    NOT_FOUND: `The ${context} with the given ID wasn't found`
  })
}