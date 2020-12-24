const express = require("express");
const app = express();
const cities = require("./cities");
const mongoose = require("mongoose");
const Campground = require("../models/campground");
const { descriptors, places } = require("./seedHelpers");

mongoose
  .connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log("CONNECTED MONGOOSE");
  })
  .catch((err) => {
    console.log(" MONGOOSE CONNECTION ERROR! ", err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 120; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30) + 10;
    const camp = await new Campground({
      author: "5fe06f2262738901ed9ef68b",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Camping describes a range of activities and approaches to outdoor accommodation. Survivalist campers set off with as little as possible to get by, whereas recreational vehicle travelers arrive equipped with their own electricity, heat, and patio furniture. Camping may be combined with hiking, as in backpacking, and is often enjoyed in conjunction with other outdoor activities such as canoeing, climbing, fishing, and hunting. Fastpacking involves both running and camping..",
      price: price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url:
            "https://res.cloudinary.com/anur4ag/image/upload/v1608655400/YelpCamp/lb7ljzl6mvtz4c89l5fz.jpg",
          filename: "YelpCamp/wfqo1zouyaynpjlshpby",
        },
        {
          url:
            "https://res.cloudinary.com/anur4ag/image/upload/v1608654142/YelpCamp/v0cbcu2r3u4elhzc0ftb.jpg",
          filename: "YelpCamp/ucsjd6ajs9hia02r4b1t",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
