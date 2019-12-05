const statusCodes = require("http-status-codes");

const { PORT = 3000 } = process.env;

module.exports = {
  statusCodes,
  errorMessages: (context = 'station', action = 'created') => ({
    NOT_FOUND: `The ${context} with the given ID wasn't found`,
    SUCCESS: `The ${context} was ${action}d successfully`,
    CONFLICT: `The ${context} already exists in the system`,
    SERVER_ERROR: 'Internal server error'
  }),
  PORT
}