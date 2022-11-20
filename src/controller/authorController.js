const authorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken")
const { nameRegex , emailRegex , passRegex } = require("../validator/validation");
const { findOne } = require("../models/authorModel")

//============================ 1st post API for create author ===================================

const creatAuthor = async function (req, res) {
    try {
        let data = req.body; 
        let {fname , lname, title, email, password} = req.body;
        

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "Body can not be empty" })
        }

        if (!fname || fname == "") {
            return res.status(400).send({ status: false, msg: "please provide fname" })
        }
        if (!nameRegex.test(fname)) {
            return res.status(400).send({ status: false, msg: "fname is invalid" })
        };
        if (!lname || lname == "") {
            return res.status(400).send({ status: false, msg: "please provide lname" })
        }
        if (!nameRegex.test(lname)) {
            return res.status(400).send({ status: false, msg: "lname is invalid" })
        };
        if (!title || title.length === 0) {
            return res.status(400).send({ status: false, msg: "please provide title " })
        }

        if(title){
        if (!(["Mr", "Mrs", "Miss"].includes(title))){
            return res.status(400).send({ status: false, msg: "please provide valid title" })
        }
        }

         if (!email || email=="") {
            return res.status(400).send({ status: false, msg: "please provide email" })
        }
        if(!emailRegex.test(email)) {
            return res.status(400).send({ status: false, msg: "email is invalid" })
        }

        if(email){
         let validateEmail = await authorModel.findOne({ email: email})
        if(validateEmail){
                return res.satus(400).send({msg:"email already registered"})
            }
        }

        if (!password || password == "") {
            return res.status(400).send({ status: false, msg: "password not found" })
        }
        if(!passRegex.test(password)) {
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
    
        if (!userName || userName == "") {
            return res.status(400).send({ status: false, msg: "email not found" })
        }
        if (!password || password== "") {
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

