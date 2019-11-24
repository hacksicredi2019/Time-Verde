import Sequelize, { Model } from "sequelize";

class SchoolExtraActivity extends Model {
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

export default SchoolExtraActivity;
