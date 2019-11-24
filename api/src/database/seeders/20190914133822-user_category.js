module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      "user_category",
      [
        {
          id: 1,
          title: "Administradores",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 2,
          title: "Escolas",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 3,
          title: "Provedores",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 4,
          title: "Público",
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: QueryInterface => {
    return QueryInterface.bulkDelete("user_category", null, {});
  }
};
