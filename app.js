const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing.js");
const app = express();
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
}
main()
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.get("/", (req, res) => {
  res.redirect("/listings");
});

//Index route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
});

//New route
app.get("/listings/new", (req, res) => {
  res.render("./listings/new.ejs");
});

//show route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("./listings/show.ejs", { listing });
});

//Create route
app.post("/listings", async (req, res, next) => {
  try {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
});

//Edit route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("./listings/edit.ejs", { listing });
});

//Update route
app.put("/listings/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(
      id,
      { ...req.body.listing },
      { runValidators: true }
    );
    res.redirect(`/listings/${id}`);
  } catch (err) {
    next(err);
  }
});

app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
});

app.use((err, req, res) => {
  res.send("something went wrong!");
});

app.listen(3000, () => {
  console.log(`Server running on port`);
});

// app.get("/testListing", async (req, res) => {
//   const sampleListing = new Listing({
//     title: "My new villa",
//     description: "By the beach",
//     price: 1200,
//     location: "calangute , Goa",
//     country: "India",
//   });

//   const result = await sampleListing.save();
//   console.log("Sample was saved:", result);

//   res.send("Sample listing saved!");
// });
