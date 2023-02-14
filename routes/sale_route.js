const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const SaleModel = mongoose.model("SaleModel")
var bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../config')
// const protectedRoute = require("../middleware/protectedResource");


router.post("/addsale", async (request, response) => {
    const id = randomstring.generate({
      length: 12,
      charset: "hex",
    });
    console.log(request.body)
    try {
      const course = new courseTemplateCopy({
        id: id,
        coursename: request.body.coursename,
        links: request.body.links,
        skills: request.body.skills,
        thumbnail: request.body.thumbnail,
        
      });
      course
        .save()
        .then((data) => {
          response.sendStatus(200);
        })
        .catch((err) => {
          console.log(err);
          response.json({ error: err });
        });
    } catch (err) {
      console.log(err);
      response.sendStatus(404);
    }
  });
  