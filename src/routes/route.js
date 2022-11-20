const express = require("express")
const router = express.Router()
const AuthorController = require("../controller/authorController")
const BlogController = require("../controller/blogController")
const AuthMid = require("../middleware/middleware")





router.post("/authors", AuthorController.creatAuthor)
router.post("/login", AuthorController.loginAuthor)
router.post("/blogs",AuthMid.authorizetion, BlogController.createBlog)
router.get("/getBlogs", AuthMid.authentication, BlogController.getBlog)
router.put("/blogs/:blogId", AuthMid.authentication,AuthMid.authorizetion, BlogController.updateBlog)
router.delete("/deleteBlogs/:blogId", AuthMid.authentication,AuthMid.authorizetion, BlogController.deleteBlog)
router.delete("/deleteBlogs", AuthMid.authorizetion, BlogController.deleteByQuery)

module.exports = router;
