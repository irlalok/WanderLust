const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error(err);
  });

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(data);
  console.log("data was initialized");
};

initDB();
