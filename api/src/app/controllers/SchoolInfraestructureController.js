import * as Yup from "yup";
import { Op } from "sequelize";
import SchoolInfraestructure from "../models/SchoolInfraestructure";

class SchoolInfraestructureController {
  async index(req, res) {
    const { page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;

    const response = await SchoolInfraestructure.findAll({
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

    const response = await SchoolInfraestructure.create(req.body);
    return res.json({
      response
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      category: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation failed" });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID is mandatory" });
    }

    const schoolInfraestructure = SchoolInfraestructure.findOne({
      where: { id }
    });

    const response = await schoolInfraestructure.update(req.body);
    return res.json({
      response
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID is mandatory" });
    }

    const schoolInfraestructure = SchoolInfraestructure.findOne({
      where: { id }
    });

    const response = await schoolInfraestructure.destroy();
    return res.json({
      response
    });
  }
}

export default new SchoolInfraestructureController();
