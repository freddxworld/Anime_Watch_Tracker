import sequelize from "./connection";
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection to database successful!");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  } finally {
    await sequelize.close();
  }
})();
