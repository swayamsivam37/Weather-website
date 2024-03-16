const request = require("postman-request");

const geoDetails = (address, callback) => {
  const geoApiUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURI(address) +
    ".json?access_token=pk.eyJ1IjoiYW5raXQ5MzA4IiwiYSI6ImNsczliNzg2ODA1N3cya2xkY2I0NnUxbGoifQ.hWcHcTm3dB4SqfVQe50N2w&limit=1";
  request({ url: geoApiUrl, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to geo Api!", undefined);
    } else if (body.features.length === 0) {
      callback("Not able to find the location, try Again!", undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoDetails;

/**
 * ----Depreciated------

const geoDetails = (address, callback) => {
    const geoApiUrl =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURI(address) +
      ".json?access_token=pk.eyJ1IjoiYW5raXQ5MzA4IiwiYSI6ImNsczliNzg2ODA1N3cya2xkY2I0NnUxbGoifQ.hWcHcTm3dB4SqfVQe50N2w&limit=1";
  
    request({ url: geoApiUrl, json: true }, (error, response) => {
      if (error) {
        callback("Unable to connect to geo Api!", undefined);
      } else if (response.body.features.length === 0) {
        callback("Not able to find the location, try Again!", undefined);
      } else {
        callback(undefined, {
          longitude: response.body.features[0].center[0],
          latitude: response.body.features[0].center[1],
          location: response.body.features[0].place_name,
        });
      }
    });
  };

  */
