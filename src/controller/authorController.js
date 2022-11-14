const authorModel = require("../models/authorModel");
const { emailValidation } = require("../validator/validation");
const { nameRegex } = require("../validator/validation");

const creatAuthor = async function (req, res) {
    try {
        let data1 = req.body

        if (Object.keys(data1).length == 0) {
            return res.status(400).send({ status: false, msg: "body can not empty" })
        }

        if (!nameRegex.test(req.body.fname)) {
            return res.status(400).send({ status: false, msg: "fname is invalid" })
        };
        if (!data1.password) {
            return res.status(400).send({ status: false, msg: "password not found" })
        }
        if (!data1.title) {
            return res.status(400).send({ status: false, msg: "fname can not found" })
        }
        if (!data1.lname) {
            return res.status(400).send({ status: false, msg: "lname can not found" })
        }
        if (!data1.fname) {
            return res.status(400).send({ status: false, msg: "fname can not found" })
        }

        if (!req.body.email) {
            return res.status(400).send({ status: false, msg: "email not found" })
        }
        if (!emailValidation.test(req.body.email)) {
            return res.status(400).send({ status: false, msg: "email is invalid" })
        }
        let savedData = await authorModel.create(data1)
        res.status(201).send({ status: true, msg: savedData })
    }
    catch (error) {
        res.status(500).send({ msg: error })
        console.log({ msg: error })
    }
};

module.exports.creatAuthor = creatAuthor

