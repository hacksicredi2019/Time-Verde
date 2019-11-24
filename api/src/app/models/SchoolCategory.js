import Sequelize, { Model } from "sequelize";

class SchoolCategory extends Model {
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

export default SchoolCategory;
