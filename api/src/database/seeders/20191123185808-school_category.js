module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      "school_categories",
      [
        {
          id: 1,
          category: "Escola Pública",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 2,
          category: "Escola Privada",
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: QueryInterface => {
    return QueryInterface.bulkDelete("school_categories", null, {});
  }
};
