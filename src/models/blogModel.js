const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            lowercase: true,
            uppercase: true,
            required: true
        },
        body: {
            type: String,
            trim: true,
            lowercase: true,
            uppercase: true,
            required: true
        },
        authorId: {
            type: ObjectId,
            trim: true,
            lowercase: true,
            uppercase: true,
            ref: "AuthorProject",
            required: true,
        },
        tags: {
            type: [String],
            trim: true,
            lowercase: true,
            uppercase: true,
        },

        category: {
            type: String,
            trim: true,
            lowercase: true,
            uppercase: true,
            required: true
        },
        subcategory: {
            type: [String],
            trim: true,
            lowercase: true,
            uppercase: true,
        },

        publishedAt: {
            type: Date,
            default: Date.now(),
        },
        isPublished: {
            type: Boolean,
            default: false
        },

        deletedAt: {
            type: Date,
            default: Date.now(),
        },
        isDeleted: {
            type: Boolean,
            default: false
        },

    },

    { timestamps: true })


module.exports = mongoose.model("Blog", blogSchema);

