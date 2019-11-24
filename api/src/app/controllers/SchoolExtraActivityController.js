import * as Yup from "yup";
import { Op } from "sequelize";
import SchoolExtraActivity from "../models/SchoolExtraActivity";

class SchoolExtraActivityController {
  async index(req, res) {
    const { page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;

    const response = await SchoolExtraActivity.findAll({
      limit,
      offset
    });
    return res.json(response);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      category: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation failed" });
    }

    const response = await SchoolExtraActivity.create(req.body);
    return res.json({
      response
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      ExtraActivity: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation failed" });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID is mandatory" });
    }

    const schoolExtraActivity = SchoolExtraActivity.findByPk(id);

    const response = await schoolExtraActivity.update(req.body);
    return res.json({
      response
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID is mandatory" });
    }

    const schoolExtraActivity = await SchoolExtraActivity.findOne({
      where: { id }
    });

    const response = await schoolExtraActivity.destroy();
    return res.json({
      response
    });
  }
}

export default new SchoolExtraActivityController();
