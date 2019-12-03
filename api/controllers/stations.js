const _ = require("lodash");
const { statusCodes, errorMessages } = require('../helpers/constants');
const schema = require('../validators/stations');

const stations = [
  { id: 0, deskID: "ARL/WST/021" },
  { id: 1, deskID: "ARL/EST/023" },
  { id: 2, deskID: "ARL/WST/011" },
  { id: 3, deskID: "ARL/EST/001" },
  { id: 4, deskID: "ARL/WST/005" }
];

/**
 * @description It is a [stationController] request handlers context
 * @class stationController
 */
class stationController {
  /**
   * @description It helps adding a new workStation
   * @static
  *  @param  {any} { body } The body object from extracted the request object
   * @param  {any} res The http response object to be sent back to the user
   * @return {any} custom http response object or an error
   * @memberof stationController
   */
  static async create({ body }, res) {
    const { deskID } = body;
    const valid = await schema.validateAsync(body);
    if (stations.find((s) => s.deskID === deskID))
      return res.status(statusCodes.CONFLICT).json({
        message: "The deskID is already in use"
      })
    const station = { id: stations.length, ...valid };
    stations.push(station);
    return res.status(statusCodes.OK).json({ station });
  }

  /**
   * @description It fetches a specific work station with a given ID
   * @static
   * @param  {any} { params } The params object from extracted the request object
   * @param  {any} res The http response object to be sent back to the user
   * @return {any} custom http response object or an error
   * @memberof stationController
   */
  static async getOne({ params }, res) {
    const station = stations.find((s) => s.id === parseInt(params.id));
    if (!station)
      return res.status(statusCodes.NOT_FOUND).json({
        message: errorMessages().NOT_FOUND
      })
    return res.status(statusCodes.OK).json({ station });
  }

  /**
   * @description It fetches all the work stations
   * @static
   * @param  {any} req The http request object received from the user
   * @param  {any} res The http response object to be sent back to the user
   * @return {any} custom http response object or an error
   * @memberof stationController
   */
  static async getAll(req, res) {
    return res.json({ stations })
  }

  /**
     * @description It updates a specific work station with a given ID
     * @static
     * @param  {any} req The http request object received from the user
     * @param  {any} res The http response object to be sent back to the user
     * @return {any} custom http response object or an error
     * @memberof stationController
     */
  static async updateOne({ params, body }, res) {
    const station = stations.find((s) => s.id === parseInt(params.id));
    if (!station)
      return res.status(statusCodes.NOT_FOUND).json({
        message: errorMessages().NOT_FOUND
      })
    const valid = await schema.validateAsync(body);
    _.merge(station, valid);
    return res.status(statusCodes.OK).json({ station })

  }

  /**
     * @description It deletes a specific work station with a given ID
     * @static
     * @param  {any} req The http request object received from the user
     * @param  {any} res The http response object to be sent back to the user
     * @return {any} custom http response object or an error
     * @memberof stationController
     */
  static async deleteOne({ params }, res) {
    const station = stations.find((s) => s.id === parseInt(params.id));
    if (!station)
      return res.status(statusCodes.NOT_FOUND).json({
        message: errorMessages().NOT_FOUND
      })
    stations.splice(stations.indexOf(station), 1);
    return res.status(statusCodes.OK).json({ station });
  }
}

module.exports = stationController