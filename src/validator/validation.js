

const emailValidation = /^\s*[a-zA-Z0-9]+([\.\-\_\+][a-zA-Z0-9]+)*@[a-zA-Z]+([\.\-\_][a-zA-Z]+)*(\.[a-zA-Z]{2,3})+\s*$/

const nameRegex = /^[a-zA-Z\-]+$/;

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false;

    if (typeof value === 'string' && value.trim().length === 0) return false

    return true;
}

const isValidRequestBody = function
    (requestBody) {
    return Object.keys(requestBody).length >0;
}


module.exports.emailValidation = emailValidation
module.exports.nameRegex = nameRegex
module.exports.isValid = isValid
module.exports.isValidRequestBody = isValidRequestBody
