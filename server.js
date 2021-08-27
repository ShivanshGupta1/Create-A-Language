const mongoclient = require("mongodb").MongoClient;
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

mongoclient
  .connect(
    "mongodb+srv://ShivanshGupta:india@2006@blogdb.xowev.mongodb.net/test?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
    }
  )

  .then((client) => {
    console.log("Connected to databases");
    const db = client.db("CreateALang");
    const languages = db.collection("Languages");
    app.set("view engine", "ejs");
    app.listen(port, function (req, res) {
      console.log("server is running");
    });
    app.get("/", function (req, res) {
      res.sendFile(__dirname + "/index.html");
    });
    app.get("/usemylang", function (req, res) {
      res.render("usemylang.ejs");
    });
    app.get("/create-a-wish", function (req, res) {
      res.render("createawish.ejs");
    });

    app.set("views", __dirname + "/views");
    app.post("/success", function (req, res) {
      languages
        .insertOne(req.body)


        .then((result) => {
          res.render("success.ejs")
          console.log(req.body)
        })

        .catch((error) => {
          console.error(error);
        });
    });
        app.post("/mylang", function (req, res) {
           languages
              .find()
              .toArray()

              .then((result) => {
                res.render("mylang.ejs", {result:result, person:req.body});
                console.log(result);
              })

              .catch((error) => {
                console.error(error);
              });
        });
  });
