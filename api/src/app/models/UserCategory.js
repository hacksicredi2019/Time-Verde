import Sequelize, { Model } from "sequelize";

class UserCategory extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING
      },
      {
        sequelize
      }
    );
  }
}

export default UserCategory;
