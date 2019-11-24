import * as Yup from "yup";
import { Op } from "sequelize";
import axios from "axios";
import SchoolList from "../models/SchoolList";
import SchoolType from "../models/SchoolType";
import file from "../../../data.json";

class CensoController {
  async index(req, res) {
    file.map(async escola => {
      escola.category_id = escola.category;
      const response = await SchoolList.create(escola);
    });

    return res.json({});
  }

  async indexLat(req, res) {
    const response = await SchoolList.findAll({ where: { latitude: null } });

    response.map(async escola => {
      const geoAdress = encodeURI(escola.address);
      const geograficInfo = await axios.get(
        `https://locationiq.com/v1/search.php?key=48ee726f697141&q=${geoAdress}&format=json`
      );

      if (geograficInfo.data.length > 0) {
        const sch = await SchoolList.findOne({ where: { id: escola.id } });
        sch.latitude = geograficInfo.data[0].latitude;
        sch.longitude = geograficInfo.data[0].longitude;
        await sch.save();
      }
    });

    return res.json({});
  }
}

export default new CensoController();
