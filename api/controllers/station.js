const Joi = require('@hapi/joi');

const models = require('../models');
const { statusCodes, errorMessages } = require('../helpers/constants');

const schema = Joi.object({
  deskID: Joi.string()
    .length(11)
    .uppercase()
    .required()
});
const { Station } = models;

/**
 * @description It is a [StationController] request handlers context
 * @class StationController
 */
class StationController {
  /**
   * @description It helps adding a new workStation
   * @static
  *  @param  {any} { body } The body object from extracted the request object
   * @param  {any} res The http response object to be sent back to the user
   * @return {any} custom http response object or an error
   * @memberof StationController
   */
  static async create({ body }, res) {
    const valid = await schema.validateAsync(body);
    const [station, created] = await Station.findOrCreate({ where: valid });
    if (!created) {
      return res.status(statusCodes.CONFLICT).json({
        message: errorMessages().CONFLICT
      })
    }
    return res.status(statusCodes.CREATED).json({
      station: station.privatize(),
      message: errorMessages(undefined, 'create').SUCCESS
    });
  }

  /**
   * @description It fetches all the work stations
   * @static
   * @param  {any} req The http request object received from the user
   * @param  {any} res The http response object to be sent back to the user
   * @return {any} custom http response object or an error
   * @memberof StationController
   */
  static async getAll(req, res) {
    const { count, rows: stations } = await Station.findAndCountAll({});
    if (!stations.length) {
      return res.status(statusCodes.NOT_FOUND).json({
        message: errorMessages().NOT_FOUND
      });
    }
    return res.status(statusCodes.OK).json({
      stations, count,
      message: errorMessages('list', 'retrieve').SUCCESS
    });
  }

  /**
   * @description It fetches a specific work station with a given ID
   * @static
   * @param  {any} { params } The params object from extracted the request object
   * @param  {any} res The http response object to be sent back to the user
   * @return {any} custom http response object or an error
   * @memberof StationController
   */
  static async getOne({ params }, res) {
    const station = await Station.findOne({
      where: { id: params.id },
    });
    if (!station) {
      return res.status(statusCodes.NOT_FOUND).json({
        message: errorMessages().NOT_FOUND
      });
    }
    return res.status(statusCodes.OK).json({
      station,
      message: errorMessages(undefined, 'retrieve').SUCCESS
    });
  }

  /**
     * @description It updates a specific work station with a given ID
     * @static
     * @param  {any} req The http request object received from the user
     * @param  {any} res The http response object to be sent back to the user
     * @return {any} custom http response object or an error
     * @memberof StationController
     */
  static async updateOne({ params, body }, res) {
    const valid = await schema.validateAsync(body);
    const [, stations] = await Station.update(valid,
      { where: { id: params.id }, returning: true },
    );
    if (!stations.length)
      return res.status(statusCodes.NOT_FOUND).json({
        message: errorMessages().NOT_FOUND
      })
    const [station] = stations;
    return res.status(statusCodes.OK).json({
      station,
      message: errorMessages(undefined, 'update').SUCCESS
    })

  }

  /**
     * @description It deletes a specific work station with a given ID
     * @static
     * @param  {any} req The http request object received from the user
     * @param  {any} res The http response object to be sent back to the user
     * @return {any} custom http response object or an error
     * @memberof StationController
     */
  static async deleteOne({ params }, res) {
    const deleted = await Station.destroy({
      where: { id: params.id }
    });
    if (!deleted) {
      return res.status(statusCodes.NOT_FOUND).json({
        message: errorMessages().NOT_FOUND
      });
    }
    return res.status(statusCodes.OK).json({
      message: errorMessages(undefined, 'delete').SUCCESS
    });
  }
}

module.exports = StationController