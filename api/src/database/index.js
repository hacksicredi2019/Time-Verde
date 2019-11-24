import Sequelize from "sequelize";

import User from "../app/models/User";
import UserCategory from "../app/models/UserCategory";
import School from "../app/models/School";
import SchoolList from "../app/models/SchoolList";
import SchoolCategory from "../app/models/SchoolCategory";
import SchoolFoodType from "../app/models/SchoolFoodType";
import SchoolInfraestructure from "../app/models/SchoolInfraestructure";
import SchoolExtraActivity from "../app/models/SchoolExtraActivity";
import SchoolType from "../app/models/SchoolType";
import SchoolAccessibility from "../app/models/SchoolAccessibility";
import databaseConfig from "../config/database";

const models = [
  UserCategory,
  User,
  School,
  SchoolCategory,
  SchoolFoodType,
  SchoolInfraestructure,
  SchoolExtraActivity,
  SchoolType,
  SchoolList,
  SchoolAccessibility
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
