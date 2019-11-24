module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("school_avaliations", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      escola: {
        type: Sequelize.INTEGER,
        references: { model: "school", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: false
      },
      user: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: false
      },
      avaliacao: {
        type: Sequelize.INTEGER,
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
    queryInterface.dropTable("school_avaliations")
};
