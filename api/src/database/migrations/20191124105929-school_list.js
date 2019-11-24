module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("school_lists", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: { model: "school_category", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: false
      },
      series: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: null
      },
      photos: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: null
      },
      themes: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: null
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
        allowNull: true
      },
      ddd: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      phone: {
        type: Sequelize.STRING,
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
        type: Sequelize.FLOAT,
        allowNull: true
      },
      longitude: {
        type: Sequelize.FLOAT,
        allowNull: true
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable("school_lists")
};
