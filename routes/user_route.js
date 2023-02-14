const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const UserModel = mongoose.model("UserModel")
const SaleModel = mongoose.model("SaleModel")
const randomstring = require("randomstring");

var bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../config.js')

router.post("/registration", (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !password || !email) {
        return res.status(400).json({ error: "one or more mendatory fields are empty" })
    }
    UserModel.findOne({ email: email })
        .then((userInDb) => {
            if (userInDb) {
                return res.status(500).json({ error: "User with this email already regitered" })
            }
            bcrypt.hash(password, 16)
                .then((hashedPassword) => {
                    const user = new UserModel({ firstName, lastName, email, password: hashedPassword });
                    user.save()
                        .then((newUser) => {
                            res.status(201).json({ result: "User Signed Up Successfully!" });
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                })
        })
        .catch((err) => {
            console.log(err);
        })
});


router.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!password || !email) {
        return res.status(400).json({ error: "one or more mendatory fields are empty" })
    }
    UserModel.findOne({ email: email })
        .then((userInDb) => {
            if (!userInDb) {
                return res.status(401).json({ error: "Invalid credentials!" })
            }
            bcrypt.compare(password, userInDb.password)
                .then((didMatch) => {
                    if (didMatch) {
                        const jwtToken = jwt.sign({ _id: userInDb._id }, JWT_SECRET);
                        const userInfo = { _id: userInDb._id, "email": userInDb.email, "firstName": userInDb.firstName, "lastName": userInDb.lastName };
                        res.status(200).json({ result: { token: jwtToken, user: userInfo } });
                    } else {
                        return res.status(401).json({ error: "Invalid credentials!" })
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        })
});



router.post("/addsale", (req, res) => {
    const saleId = randomstring.generate({
        length: 12,
        charset: "hex",
    });
    const { productName, quantity, saleAmount } = req.body;
    if (!productName || !quantity || !saleAmount) {
        return res.status(400).json({ error: "one or more mendatory fields are empty" })
    }
    const saleObj = new SaleModel({ saleId: saleId, productName: productName, quantity: quantity, saleAmount: saleAmount });

    saleObj.save()
        .then((newSale) => {
            return res.status(201).json({ sale: newSale })
        })
        .catch((error) => {
            console.log(error);
        })
});

router.get("/allsales", (req, res) => {
    SaleModel.find()
        .then((dbSale) => {
            res.status(200).json({ sale: dbSale })
        })
        .catch((error) => {
            console.log(error);
        })
})

router.get("/total", (req, res) => {
  
    SaleModel.find()
        .then((dbSale) => {
            res.status(200).json({ sale: dbSale })
        })
        .catch((error) => {
            console.log(error);
        })
})

module.exports = router;