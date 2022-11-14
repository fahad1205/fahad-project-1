const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel")

const createBlog = async function(req,res){
    try{
        let data2 = req.body
       let authorId = req.body
        if(!authorId) res.status(400).send({status:false, msg: "author does not exist !!"})
        let savedBlog = await blogModel.create(data2)
        res.status(201).send({status:true, msg: savedBlog})
    }
    catch(error){res.status(500).send({msg:error})
    console.log({msg: error})
}};

//================================================================================================================

const getBlog = async function(req,res){
    try{
        let authorId = req.query.authorId
        let category = req.query.category
        let tags = req.query.tags
        let subcategory = req.query.subcategory
        let allBlog = await blogModel.find({authorId, category, tags, subcategory, isDeleted:false, isPublished:true})
        res.status(200).send({status:true, msg: allBlog})
        if(!allBlog) res.status(404).send({status:false, msg:"Blogs are not found"})
    }
    catch(error){res.status(500).send({msg:error})
    console.log({msg: error})
}};


module.exports.createBlog = createBlog
module.exports.createBlog = createBlog


