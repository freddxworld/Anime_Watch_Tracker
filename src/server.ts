import dotenv from "dotenv"
dotenv.config();

import app from "./app";
import sequelize from "./database/connection";
import Anime from "./models/anime";

const Port = process.env.PORT || 3000;

async function start() {
  try{
    await sequelize.authenticate();
    console.log("✅ database connected");

    await sequelize.sync({alter: true}); //creates and updates tables
    console.log("✅ models synched");

    app.listen(Port, () => {
      console.log(`✅ Server listening at http://localhost:${Port}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server", err);
    process.exit(1);
  }
}
start();