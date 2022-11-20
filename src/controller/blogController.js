const authormodel = require("../models/authorModel")

const blogModel = require("../models/blogModel")
const mongoose = require('mongoose')


//=========================== 2nd post API for create blog =================================================

const createBlog = async function (req, res) {
    try {
        let data = req.body
        let { title, body, authorId, category, tags, subcategory ,isPublished} = data

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "Body can not empty" })
        }
        if (!authorId || authorId == "") {
            res.status(400).send({ status: false, msg: "Please provide author Id" })
        }
        if (!title || title == "") {
            res.status(400).send({ status: false, msg: "Please provide Title" })
        }
        if (!body || body == "") {
            res.status(400).send({ status: false, msg: "Please provide Body" })
        }
        if (!tags || tags == "") {
            res.status(400).send({ status: false, msg: "Please provide Tags" })
        }
        if (!category || category == "") {
            res.status(400).send({ status: false, msg: "Please provide Category" })
        }
        // if(data.authorId !== req.authorId){
        //     return res.status(401).send({msg:"authorisation failed"})
        // }
        if(isPublished == true){
            data.publishedAt = Date.now()
          }
       
        let savedBlog = await blogModel.create(data)
        res.status(201).send({ status: true, msg: "Blog created", data: savedBlog })
       
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
};

//============================= 3rd get API for get blogs ===============================================

const getBlog = async function (req, res) {
    try {

        let { authorId, category, tags, subcategory } = req.query
        let filter = { isDeleted: false, isPublished: true }

        if (authorId) { filter.authorId = authorId }

        if (req.query.authorId) {
            if (!mongoose.isValidObjectId(req.query.authorId)) {
                return res.status(400).send({ status: false, msg: "Please enter valid author Id" })
            } else {
                req.query.authorId = authorId
            }
        }
        if (category) { filter.category = category }
        if (tags) { filter.tags = tags }
        if (subcategory) { filter.subcategory = subcategory }

        const detail = await blogModel.find(filter)
        if (detail.length == 0) {
            return res.status(404).send({ status: false, msg: "Blog not Found " })
        }
        else {
            return res.status(200).send({ status: true, msg: "data fetch successfully", data: detail })
        }
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

//============================== 4th put API for update =================================================

const updateBlog = async function (req, res) {

    try {
        const blogData = req.body
        const blogId = req.params.blogId

        if (Object.keys(blogData).length == 0) {
            return res.status(404).send({ status: false, msg: "Please enter details" })
        }
        if(!mongoose.isValidObjectId(blogId)){
            return res.status(400).send({status: false, msg: "enter valid id" })
        }

        
        let findBlogId = await blogModel.findById(blogId)
        if (!findBlogId) {
            return res.status(404).send({ status: false, msg: " Please Provide Blog Id" })
        }
        // if(findBlogId.authorId._id.toString() !== req.body.authorId){
        //     return res.status(400).send({status:false , msg: "authorisation failed" })
        // }
        if (findBlogId.isDeleted == true) {
            return res.status(404).send({ status: false, msg: " Blog is deleted" })
        }
        if(findBlogId.isDeleted==false){
        let updatedData = await blogModel.findOneAndUpdate(
            { _id: blogId },
            {
                $set: { "title": blogData.title, "body": blogData.body, "category": blogData.category, publishedAt: new Date(), isPublished: true },
                $push: { "tags": req.body.tags, "subcategory": req.body.subcategory }
            }
            , { new: true, upsert: true })

        res.status(200).send({ status: true, msg: "blog updated successfuly", data: updatedData })
        }
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })

    }
}

//============================= 5th delete API with path param =================================================

const deleteBlog = async function (req, res) {

    try {
        let blogId = req.params.blogId
        if(!mongoose.isValidObjectId(blogId)){
            return res.status(400).send({status: false, msg: "enter valid id" })
        }

        let checkBlogId = await blogModel.findById(blogId)

        if(!checkBlogId){
            res.status(404).send({ status: false, msg: "Blogid not found" })
         }

       if(checkBlogId.isDeleted == true){
           res.status(400).send({ status: false, msg: "Blog is already deleted" })
        }
        // if(checkBlogId.authorId._id.toString() !== req.authorId){
        //     return res.status(400).send({status:false , msg: "authorisation failed" })
        // }

        let deleteBlog = await blogModel.findByIdAndUpdate({ _id: blogId }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })
        res.status(200).send({ status: true, msg: "Blog deleted successfully", data: deleteBlog })
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
};
//============================ 6th delete API with query =======================================================


const deleteByQuery= async function(req,res){
    try
       {  
        const data=req.query 
      const {category, authorId, tags, subcategory,isPublished}=data
      if(Object.keys(data).length==0){
       return res.status(400).send({status:false,msg:"no data is provided"})
      }
      if(isPublished==true){
       return res.status(400).send({status:false,msg:"blog is published"})
      }
   
      const deletedBlogs=await blogModel.updateMany(
       data,
      {isDeleted:true,deletedAt:new Date()},
      {new:true}
       )
       if(!deletedBlogs){
           return res.status(404).send({status:false,msg:"blog not found"})
       }
       return res.status(200).send({status:true,msg:deletedBlogs})
   }
   catch(error){
       return res.status(500).send({status:false,msg:error.message})
   }
   }



module.exports.createBlog = createBlog
module.exports.getBlog = getBlog
module.exports.updateBlog = updateBlog
module.exports.deleteBlog = deleteBlog
module.exports.deleteByQuery = deleteByQuery


