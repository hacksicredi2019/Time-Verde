import Sequelize, { Model } from "sequelize";

class SchoolInfraestructure extends Model {
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

export default SchoolInfraestructure;
