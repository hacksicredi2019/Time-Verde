import * as Yup from "yup";
import User from "../models/User";

class UserController {
  async index(req, res) {
    const { category_id, page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (category_id) {
      where.category_id = category_id;
    }

    const response = await User.findAll({
      where: where || false,
      limit,
      offset
    });

    return res.json(response);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      phone: Yup.number(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6)
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation faild" });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: "User already exists." });
    }

    const { name, email, password_hash } = await User.create(req.body);
    return res.json({
      name,
      email,
      password_hash
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string()
        .required()
        .min(6),
      password: Yup.string()
        .min(6)
        .when("oldPassword", (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when("password", (password, field) =>
        password ? field.required().oneOf([Yup.ref("password")]) : field
      )
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation faild" });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && email != user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: "Email already exists." });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: "Old Password does not match" });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({ id, name, provider });
  }
}

export default new UserController();
