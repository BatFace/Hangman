const express = require("express");
const bodyParser = require("body-parser");
const verifyToken = require("../verifyToken");
const Word = require("../../models/word");

let wordRouter = express.Router();
wordRouter.use(bodyParser.json());

wordRouter.get("/", verifyToken, function(req, res) {
  const random = req.query.random === "true";
  const size = req.query.size === "1";

  if(random && size) {
    Word.aggregate([
      {$sample: {size: 1}}
    ], function (err, result) {
      const word = result[0].word;
      return res.status(200).send({word});
    });
  } else {
    return res.status(403).send("Missing query string parameter(s). Required: ?random=true&size=1");
  }
});

module.exports = wordRouter;
