import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_DB_URL);
    const connection = mongoose.connection;
    connection.on("Connected", () => {
      console.log("MongoDB connected successfully");

      connection.on("error", (err) => [
        console.log(`MongoDB error: ${err}`),
        process.exit(),
      ]);
    });
  } catch (error) {
    console.error(error);
  }
}
