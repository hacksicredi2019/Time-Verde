import Sequelize, { Model } from "sequelize";

class SchoolType extends Model {
  static init(sequelize) {
    super.init(
      {
        category: Sequelize.STRING
      },
      {
        sequelize
      }
    );
  }
}

export default SchoolType;
