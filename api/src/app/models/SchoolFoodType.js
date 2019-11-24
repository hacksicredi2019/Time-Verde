import Sequelize, { Model } from "sequelize";

class SchoolFoodType extends Model {
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

export default SchoolFoodType;
