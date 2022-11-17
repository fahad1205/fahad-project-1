const authorModel = require("../models/authorModel");
const jwt = require("jsonwebtoken")
const { isValid } = require("../validator/validation");

//============================ 1st post API for create author ===================================

const creatAuthor = async function (req, res) {
    try {
        let data = req.body;
        let {fname , lname, title, email, password} = data;
        

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "Body can not empty" })
        }

        if (!isValid(fname)) {
            return res.status(400).send({ status: false, msg: "fname can not found" })
        }
        if (!(/^[a-zA-Z]+$/.test(data.fname.trim()))) {
            return res.status(400).send({ status: false, msg: "fname is invalid" })
        };
        if (!isValid(lname)) {
            return res.status(400).send({ status: false, msg: "lname can not found" })
        }
        if (!(/^[a-zA-Z]+$/.test(data.lname.trim()))) {
            return res.status(400).send({ status: false, msg: "lname is invalid" })
        };
        if (!isValid(title)) {
            return res.status(400).send({ status: false, msg: "title can not found" })
        }
        if (!isValid(email)) {
            return res.status(400).send({ status: false, msg: "email not found" })
        }
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email.trim()))) {
            return res.status(400).send({ status: false, msg: "email is invalid" })
        }
        if (!isValid(password)) {
            return res.status(400).send({ status: false, msg: "password not found" })
        }
        if(!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
        .test(data.password.trim()))) {
            return res.status(400).send({ status: false, msg: "password is invalid" })
        }
        
        let savedData = await authorModel.create(data)
        res.status(201).send({ status: true, msg:"new author is created", data: savedData })
    }

    catch (error) {
        res.status(500).send({ msg: "not working" })
    }
};

//===================================== 7th-LOGIN API ====================================================//

const loginAuthor = async function (req, res) {

    try {
        let data = req.body
        let userName = req.body.email;
        let password = req.body.password;

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "Please provide userName and passowrd" })
        }
    
        if (!isValid(userName)) {
            return res.status(400).send({ status: false, msg: "email not found" })
        }
        if (!isValid(password)) {
            return res.status(400).send({ status: false, msg: "password not found" })
        }

        let confirmData = await authorModel.findOne({ email: userName, password: password });
        if (!confirmData) {
            return res.status(404).send({ status: false, msg: "username or password is not found" });
        }
        

        let token = jwt.sign(
            {
                userId: userName._id,
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


module.exports.loginAuthor = loginAuthor
module.exports.creatAuthor = creatAuthor

