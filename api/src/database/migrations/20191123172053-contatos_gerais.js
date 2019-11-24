module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("general_contacts", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      ddd: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      phone: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      cellphone: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      postal_code: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      number: {
        type: Sequelize.STRING,
        allowNull: true
      },
      complement: {
        type: Sequelize.STRING,
        allowNull: true
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
        default: "BRA"
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    }),

  down: (queryInterface, Sequelize) =>
    queryInterface.dropTable("general_contacts")
};
