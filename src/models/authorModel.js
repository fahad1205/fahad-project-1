const mongoose = require("mongoose")
require("mongoose-type-email")
const authorSchema = new mongoose.Schema(
    {
        fname: {
            type: String,
            trim: true,
            lowercase: true,
            uppercase: true,
            required: "Fname is required"
        },
        lname: {
            type: String,
            trim: true,
            lowercase: true,
            uppercase: true,
            required: "Lname is required"
        },
        title: {
            type: String,
            trim: true,
            lowercase: true,
            uppercase: true,
            required: "Title is required",
            enum: ['Mr', "Mrs", "Miss"]
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            uppercase: true,
            unique: true,
            required: 'Email address is required',
        },
        password: {
            type: String,
            trim: true,
            lowercase: true,
            uppercase: true,
            required: "Password is required",
        },

    },

    { timestamps: true })


module.exports = mongoose.model('AuthorProject', authorSchema)

