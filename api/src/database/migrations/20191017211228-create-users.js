module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: { model: "user_category", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: false
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true
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
      latitude: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      longitude: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      password_hash: {
        type: Sequelize.FLOAT,
        allowNull: false
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable("users")
};
