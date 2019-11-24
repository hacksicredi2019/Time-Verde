import * as Yup from "yup";
import { Op } from "sequelize";
import SchoolList from "../models/SchoolList";

class SchoolController {
  async index(req, res) {
    const { themes, page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (themes) {
      where.themes = { [Op.contains]: themes };
    }

    const response = await SchoolList.findAll({
      where: where || false,
      limit,
      offset
    });

    return res.json(response);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      phone: Yup.number()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation failed" });
    }

    const response = await SchoolList.create(req.body);
    return res.json({
      response
    });
  }
}

export default new SchoolController();
