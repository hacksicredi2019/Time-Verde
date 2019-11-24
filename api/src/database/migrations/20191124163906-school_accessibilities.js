module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("school_accessibilities", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      category: {
        type: Sequelize.STRING,
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

  down: (queryInterface, Sequelize) =>
    queryInterface.dropTable("school_accessibilities")
};
