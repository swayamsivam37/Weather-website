const weatherReport = (location, errorPara, weatherPara, additionalPara) => {
  fetch(`/weather?location=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.Error) {
        errorPara.textContent = JSON.stringify(data.Error);
      } else {
        errorPara.textContent = data.location;
        weatherPara.textContent = data.forecast;
        additionalPara.textContent = `Currently,It's ${data.timeOfDay} here !`;
      }
    });
  });
};

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const errorPara = document.querySelector("#errorPara");
const weatherPara = document.querySelector("#weatherReport");
const additionalPara = document.querySelector("#timeOfDay");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  errorPara.textContent = "Loading...";
  weatherPara.textContent = "";
  const location = search.value;
  weatherReport(location, errorPara, weatherPara, additionalPara);
});
