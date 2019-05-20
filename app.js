const fetch = require("node-fetch");
const express = require("express");
const path = require("path");

const app = express();

app.set("views", path.join(__dirname, "public"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded());

const fetchData = res => {
  fetch("https://data.nasa.gov/resource/gh4g-9sfh.json")
    .then(res => {
      return res.json();
    })
    .then(jsonData => {
      res.render("index.ejs", { jsonData });
    })
    .catch(err => {
      console.error(err);
    });
};

// const renderData = data => {
//   return;
// };

const searchData = (searchKey, res) => {
  let data = titleCase(searchKey);
  let newData = data.trim();

  if (!newData) {
    fetchData(res);
  } else {
    fetch(`https://data.nasa.gov/resource/gh4g-9sfh.json?name=${newData}`)
      .then(res => {
        return res.json();
      })
      .then(jsonData => {
        res.render("index.ejs", { jsonData });
      })
      .catch(err => {
        console.error(err);
      });
  }
};

app.get("/", (req, res, next) => {
  fetchData(res);
});

app.post("/search", (req, res, next) => {
  searchData(req.body.search, res);
});

const titleCase = str => {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
};

app.listen(3000, () => {
  console.log("deployed");
});
