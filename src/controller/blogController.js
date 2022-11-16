const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel")
const Valid = require("../validator/validation")
const {isValidObjectId} = require("mongoose")

//=========================== 2nd post API ================================================================

const createBlog = async function(req,res){
    try{
        let data2 = req.body
       let authorId = req.body
        if(!authorId) res.status(400).send({status:false, msg: "author does not exist !!"})
        if(!isValidObjectId(Id)){
            return res.status(400).send({status:false,msg:" Pls provide Valid author Id"})
        }
        let savedBlog = await blogModel.create(data2)
        res.status(201).send({status:true, msg: savedBlog})
    }
    catch(error){res.status(500).send({msg:error})
    console.log({msg: error})
}};

//============================= 3rd get API ===============================================================

const getBlog = async function (req, res) {
    try {
        
        if (req.query.authorId || req.query.tags || req.query.category || req.query.subCategory) {
            let authorId = req.query.authorId
            let tags = req.query.tags
            let category = req.query.category
            let subCategory = req.query.subCategory
            let obj = {}
            if (authorId) {
                obj.authorId = authorId

            }
            if (tags) {
                obj.tags = tags
            }
            if (category) {
                obj.category = category
            }
            if (subCategory) {
                obj.subCategory = subCategory
            }
            obj.isDeleted = false
            obj.isPublished = true
           
            const detail = await blogModel.find(obj)
            if (!detail) {
                return res.status(400).send({ status: false, msg: "given data is invalid " })
            }
            else {
                return res.status(200).send({ status: true, msg: "data fetch successfully", data: detail })
            }
        }

      

    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.msg })
    }
}
//============================== 4th put API ===========================================================

const updateBlog = async function (req, res) {

    try {
           const blogId = req.params.blogId
           const checkId = await blogModel.findById(blogId)
           if(checkId){
              const requestBody=req.body
           const {title, body, tags, subcategory ,isPublished}= requestBody
           if (!Valid.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, msg: " Pls Provide requestBody" })
        }
        if (!Valid.isValid(title)) {
            return res.status(400).send({ status: false, msg: " Pls Provide title for blog" })
        }
        if (!Valid.isValid(body)) {
            return res.status(400).send({ status: false, msg: "Body is Mandtory" })
        }
        if (!Valid.isValid(tags)) {
            return res.status(400).send({ status: false, msg: "Pls provide tags of blog" })
        }
        if (!Valid.isValid(subcategory)) {
            return res.status(400).send({ status: false, msg: "Pls provide subCategory of blog" })
        }
        if (!Valid.isValid(isPublished)) {
            return res.status(400).send({ status: false, msg: "Pls provide  blog is published or not " })
        }

        let savedData= await blogModel.findOneAndUpdate({_id:blogId},{ $set: { "title": req.body.title, "body": req.body.body, "category": req.body.category },
        $push: { "tags": req.body.tags, "subcategory": req.body.subcategory } }
        ,{new:true})

        res.status(200).send({status:true,msg:"blog updated successfuly",data:savedData})
    }else{
        return res.status(404).send({status:false,msg:"blog id does not exist "})
    }

    } catch (error) {
        return res.status(500).send({status:false,msg:error.message})

    }



}
//============================= 5th delete API =======================================================
const deleteBlog = async function (req,res) {

    try{
        let blogId =req.params.blogId
        let deleteBlog=await blogModel.findByIdAndUpdate({_id:blogId},{$set:{isDeleted:true}},{new: true})
        res.status(200).send({status:true, msg: deleteBlog})
        if(!deleteBlog) res.status(404).send({status:false, msg:"Blogs are not found"})
    }
    catch(error){res.status(500).send({msg:error})
    console.log({msg: error})
}};
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


