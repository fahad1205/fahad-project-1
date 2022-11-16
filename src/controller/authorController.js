const authorModel = require("../models/authorModel");
const { emailValidation, isValid } = require("../validator/validation");
const { nameRegex } = require("../validator/validation");
const Valid = require("../validator/validation")
const { isValidObjectId } = require("mongoose")
const jwt = require("jsonwebtoken")


const creatAuthor = async function (req, res) {
    try {
        let data = req.body


        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "body can not empty" })
        }
        if (!data.fname) {
            return res.status(400).send({ status: false, msg: "fname can not found" })
        }
        if (!nameRegex.test(req.body.fname)) {
            return res.status(400).send({ status: false, msg: "fname is invalid" })
        };
        if (!data.lname) {
            return res.status(400).send({ status: false, msg: "lname can not found" })
        }
        if (!data.title) {
            return res.status(400).send({ status: false, msg: "title can not found" })
        }
        if (!req.body.email) {
            return res.status(400).send({ status: false, msg: "email not found" })
        }
        if (!emailValidation.test(req.body.email)) {
            return res.status(400).send({ status: false, msg: "email is invalid" })
        }
        if (!data.password) {
            return res.status(400).send({ status: false, msg: "password not found" })
        }
        let savedData = await authorModel.create(data)
        res.status(201).send({ status: true, msg: savedData })
    }

    catch (error) {
        res.status(500).send({ msg: error })
        console.log({ msg: error })
    }
};

//===================================== 7th-LOGIN API  =======================================================================//

const loginUser = async function (req, res) {

    try {
        let userName = req.body.email;
        let password = req.body.password;

        let user = await authorModel.findOne({ email: userName, password: password });
        if (!user) {
            return res.status(404).send({ status: false, msg: "username or password is not found" });
        }
        

        let token = jwt.sign(
            {
                userId: user._id.toString(),
                batch: "lithium",
                project: "project1",
            },
            "functionup"
        );
        res.setHeader("x-api-key", token);
        res.status(200).send({ status: true, data: token });
    }
    catch (error) {
        res.status(500).send({ msg: error })
        console.log({ msg: error })
    }
};


module.exports.loginUser = loginUser
module.exports.creatAuthor = creatAuthor

