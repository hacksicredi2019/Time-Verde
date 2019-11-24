import Sequelize, { Model } from "sequelize";
import axios from "axios";

class SchoolList extends Model {
  static init(sequelize) {
    super.init(
      {
        avatar: Sequelize.STRING,
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        category_id: Sequelize.INTEGER,
        ddd: Sequelize.INTEGER,
        phone: Sequelize.STRING,
        cellphone: Sequelize.INTEGER,
        themes: Sequelize.ARRAY(Sequelize.INTEGER),
        series: Sequelize.ARRAY(Sequelize.INTEGER),
        photos: Sequelize.ARRAY(Sequelize.INTEGER),
        postal_code: Sequelize.INTEGER,
        address: Sequelize.STRING,
        number: Sequelize.STRING,
        complement: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        country: Sequelize.STRING,
        latitude: Sequelize.DOUBLE,
        longitude: Sequelize.DOUBLE
      },
      {
        sequelize
      }
    );

    this.addHook("beforeSave", async school => {
      if (school.address && school.state && school.city) {
        const geoAdress = encodeURI(
          `${school.address},${school.number} ${school.city} ${school.state}`
        );
        const geograficInfo = await axios.get(
          `https://locationiq.com/v1/search.php?key=48ee726f697141&q=${geoAdress}&format=json`
        );
        console.log(geograficInfo.data, geograficInfo.data.length);
        if (geograficInfo.data.length > 0) {
          const { lat = 0, lon = 0 } = geograficInfo.data[0];
          school.latitude = lat;
          school.longitude = lon;
        }
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.SchoolCategory, {
      foreignKey: "category_id",
      as: "category"
    });
  }
}

export default SchoolList;
