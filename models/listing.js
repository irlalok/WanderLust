const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: String,
    url: {
      type: String,
      default:
        "https://cdn.pixabay.com/collection/thumbnail/2025/06/05/island-2722471_1280.jpg",
      set: (v) =>
        v === ""
          ? "https://cdn.pixabay.com/collection/thumbnail/2025/06/05/island-2722471_1280.jpg"
          : v,
    },
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
