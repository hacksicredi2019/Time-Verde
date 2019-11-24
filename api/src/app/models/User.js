import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";
import axios from "axios";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        avatar: Sequelize.STRING,
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        ddd: Sequelize.INTEGER,
        phone: Sequelize.INTEGER,
        cellphone: Sequelize.INTEGER,
        postal_code: Sequelize.INTEGER,
        address: Sequelize.STRING,
        number: Sequelize.STRING,
        complement: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        country: Sequelize.STRING,
        latitude: Sequelize.DOUBLE,
        longitude: Sequelize.DOUBLE,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING
      },
      {
        sequelize
      }
    );

    this.addHook("beforeSave", async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }

      if (user.address && user.state && user.city) {
        const geoAdress = encodeURI(
          `${user.address},${user.number} ${user.city} ${user.state}`
        );
        const geograficInfo = await axios.get(
          `https://locationiq.com/v1/search.php?key=48ee726f697141&q=${geoAdress}&format=json`
        );
        if (geograficInfo.lenght === 1) {
          const { lat = 0, lon = 0 } = geograficInfo[0];
          user.latitude = lat;
          user.longitude = lon;
        }
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.UserCategory, {
      foreignKey: "category_id",
      as: "category"
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
