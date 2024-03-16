const request = require("postman-request");

const weatherInfo = ({ longitude, latitude }, callback) => {
  const url =
    // "http://api.weatherstack.com/current" +
    "http://api.weatherstack.com/current?access_key=9707537cfe946b8c7c12622a1aa3629f&query=" +
    latitude +
    "," +
    longitude +
    "&unit=m";
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather Api!", undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      callback(undefined, {
        temperature: body.current.temperature,
        feelsLike: body.current.feelslike,
        isDay: body.current.is_day,
      });
    }
  });
};

module.exports = weatherInfo;

/**
 * -----Depreciated ------------
 * 
 * request({ url: url, json: true }, (error, response) => {
  if (error) {
    console.log(`weather Api is unreachable !`);
  } else if (response.body.error) {
    console.log(`Something went Wrong !`);
    console.log(response.body.error.info);
  } else {
    const data = {
      observation_time: "02:37 PM",
      temperature: 1,
      weather_code: 113,
      weather_icons: [Array],
      weather_descriptions: [Array],
      wind_speed: 11,
      wind_degree: 10,
      wind_dir: "N",
      pressure: 1015,
      precip: 0,
      humidity: 49,
      cloudcover: 0,
      feelslike: -3,
      uv_index: 2,
      visibility: 16,
      is_day: "yes",
    };
    console.log(`Tempreture: ${data.temperature}`);
  }
});
 */
