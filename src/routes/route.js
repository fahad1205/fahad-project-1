const express = require("express")
const router = express.Router()
const AuthorController = require("../controller/authorController")
const BlogController = require("../controller/blogController")

router.post("/authors", AuthorController.creatAuthor)
router.post("/blogs", BlogController.createBlog)
router.get("/getBlogs", BlogController.getBlog)

module.exports = router;
