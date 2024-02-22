import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
const port = 3000;

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Database is connected successfully");
    app.listen(port, () => {
      console.log(`Application listening on port ${port}`);
    });
  } catch (error) {}
}

bootstrap();
