const express = require("express")
const router = express.Router()
const AuthorController = require("../controller/authorController")
const BlogController = require("../controller/blogController")
const AuthMid = require("../middleware/middleware")





router.post("/authors", AuthorController.creatAuthor)
router.post("/blogs",AuthMid.authenticate, BlogController.createBlog)
router.get("/getBlogs", AuthMid.authenticate, BlogController.getBlog)
router.put("/blogs/:blogId", AuthMid.authenticate,AuthMid.authorise, BlogController.updateBlog)
router.delete("/blogs/:blogId", AuthMid.authenticate, BlogController.deleteBlog)
router.delete("/blogs", AuthMid.authenticate, BlogController.deleteByQuery)
router.post("/login", AuthorController.loginUser)

module.exports = router;
