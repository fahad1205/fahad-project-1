const jwt = require('jsonwebtoken')
//const AuthorModel = require("../models/AuthorModel");

const authenticate = function (req, res, next) {

    try {
        let token = req.headers["x-api-key"];
        console.log(token);

        if (!token) return res.send({ status: false, msg: "token must be present" });

        let decodedToken = jwt.verify(token, 'functionup')

        if (!decodedToken)
        return res.status(400).send({ status: false, msg: "token is not valid" })

        next()

    }
    catch (error) {
        res.status(500).send({ msg: error })
    }
};

//======================================================================================================//

const authorise = function (req, res, next) {
try{
    let token = req.headers["x-api-key"]
    let decodedToken = jwt.verify(token, 'functionup')

    if (!decodedToken) {
        return res.status(400).send({ status: false, msg: "token is not valid" })
    }
    let userToBeEdit = req.params.author
    let userLoggedIn = decodedToken.authorId

    //userId comparision to check if the logged-in user is requesting for their own data
    if (userToBeEdit != userLoggedIn)
    return res.status(401).send({ status: false, msg: 'Author logged is not allowed to modify the requested users data' })
    next()
}
catch(error) {
    res.status(500).send({ msg: error })
}
};

//====================================================================================================//



module.exports.authenticate = authenticate
module.exports.authorise = authorise