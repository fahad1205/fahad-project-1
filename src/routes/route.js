const express = require("express")
const router = express.Router()
const AuthorController = require("../controller/authorController")
const BlogController = require("../controller/blogController")

router.post("/authors", AuthorController.creatAuthor)
router.post("/blogs", BlogController.createBlog)
router.get("/getBlogs", BlogController.getBlog)
router.put("/blogs/:blogId", BlogController.updateBlog)
router.delete("/blogs/:blogId", BlogController.deleteBlog)
router.delete("/blogs", BlogController.deleteByQuery)

module.exports = router;
