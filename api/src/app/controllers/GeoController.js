import * as Yup from "yup";
import Sequelize from "sequelize";
import axios from "axios";

class GeoController {
  async index(req, res) {
    const schema = Yup.object().shape({
      distance: Yup.number(),
      page: Yup.number(),
      limit: Yup.number()
    });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: "Validation failed" });
    }

    const {
      latitude,
      longitude,
      distance = 5,
      page = 1,
      limit = 50
    } = req.query;

    const offset = (page - 1) * limit;
    const newDistance = distance / 1.609;

    const sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      { dialect: "postgres" }
    );

    const response = await sequelize.query(
      `

  SELECT *, cast(point(${longitude},${latitude}) <@> point(longitude, latitude)::point as decimal(10,2)) as distance
  FROM school_lists
  WHERE  (point(${longitude},${latitude} ) <@> point(longitude, latitude)) < ${newDistance}
  ORDER BY distance offset ${offset} limit ${limit}`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    return res.json(response);
  }

  async index_address(req, res) {
    const schema = Yup.object().shape({
      address: Yup.string().required(),
      distance: Yup.number(),
      page: Yup.number(),
      limit: Yup.number()
    });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: "Validation failed" });
    }

    const { address, distance = 5, page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;
    if (address) {
      const geoAdress = encodeURI(address);
      const geograficInfo = await axios.get(
        `https://locationiq.com/v1/search.php?key=48ee726f697141&q=${geoAdress}&format=json`
      );

      if (geograficInfo.data.length > 0) {
        const { lat = 0, lon = 0 } = geograficInfo.data[0];
        req.latitude = lat;
        req.longitude = lon;
      }
    }

    const { latitude, longitude } = req;

    if (!longitude || !latitude) {
      return res.status(400).json({ error: "Localization not found" });
    }
    const newDistance = distance / 1.609;

    const sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      { dialect: "postgres" }
    );

    const response = await sequelize.query(
      `

  SELECT *, cast(point(${longitude},${latitude}) <@> point(longitude, latitude)::point as decimal(10,2)) as distance
  FROM school_lists
  WHERE  (point(${longitude},${latitude} ) <@> point(longitude, latitude)) < ${newDistance}
  ORDER BY distance offset ${offset} limit ${limit}`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    return res.json(response);
  }
}

export default new GeoController();
