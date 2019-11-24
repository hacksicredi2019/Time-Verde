import Sequelize, { Model } from "sequelize";

class SchoolAccessibility extends Model {
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

export default SchoolAccessibility;
