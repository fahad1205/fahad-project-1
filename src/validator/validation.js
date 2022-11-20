const { default: mongoose } = require("mongoose");


//===================== for object empty or not ========================================

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false;

    if (typeof value === 'string' && value.trim().length === 0) return false

    return true;
}

//====================== for valid object id ===========================================

const isValidObjectId = function(objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const nameRegex=  /^[a-zA-Z]+$/

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/

module.exports = {isValid,isValidObjectId, nameRegex, emailRegex, passRegex}

