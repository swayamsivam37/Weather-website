const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;
const geoDetails = require("./utils/geoDetails");
const weatherInfo = require("./utils/weatherInfo");
// setting up the path for public and view folder
const publicFolderPath = path.join(__dirname, "/../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//set the required paths
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// static Folder setup
app.use(express.static(publicFolderPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    createdBy: "Ankit Kumar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    createdBy: "Ankit Kumar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    createdBy: "Ankit Kumar",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({
      Error: "Please pass the location in query parameter!",
    });
  }
  geoDetails(req.query.location, (error, data) => {
    if (error) {
      return res.send({
        Error: error,
      });
    }
    weatherInfo(data, (error, { temperature, feelsLike, isDay } = {}) => {
      if (error) {
        return res.send({
          Error: error,
        });
      }
      const timeOfDay = isDay == "no" ? "NIGHT" : "DAY";
      res.send({
        location: data.location,
        forecast: `Current Tempreture is ${temperature}. Outside it feels like ${feelsLike}`,
        timeOfDay: timeOfDay,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.location) {
    return res.send({
      Error: "Location is a required Parameter",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("notFound", {
    title: "404",
    Error: "Uh, Oh !, Help Article Not found.",
    createdBy: "Ankit Kumar",
  });
});

app.get("*", (req, res) => {
  res.render("notFound", {
    title: "404",
    createdBy: "Ankit Kumar",
    Error: "Page Not Found",
  });
});

app.listen(port, () => {
  console.log("Listening on port 3000");
});
