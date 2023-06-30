import "dotenv/config";
import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

const defaults = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  connectTimeoutMS: 5000,
};

export default function MongoClient() {
  mongoose.connect(MONGODB_URI, defaults);

  const connection = mongoose.connection;

  connection
    .once("open", function () {
      console.log("Database Connected 👍");
    })
    .on("error", function (err) {
      console.log("Database Not Connected : ", err);
    });
}
