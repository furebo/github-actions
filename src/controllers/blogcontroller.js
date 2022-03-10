import blogModel from '../database/models/blogModel.js';
import multer from 'multer';

const createBlog = (req,res)=>{

    const Storage = multer.diskStorage({
        destination:'uploads',
        filename:(req,file,cb)=>{
            cb(null,file.originalname)
        }
    })
    const upload = multer({
        storage:Storage
    }).single('blogImage')

    upload(req,res,(err)=>{
        if(err){
            res.json({
                message:"There is an error."
            })
        }else{
           const blog = new blogModel({
                title:req.body.title,
                description:req.body.description,
                content:req.body.description,
                image:{
                    data:req.file.filename
                }
            })

        blog.save().then((blog)=>{
            res.json({
                message:"The blog created successfuly",
                blog:blog
            })
        }).catch(err =>{
            res.json({
                message:"There is an error."
            })
        })
    }
})

    // try {
    //     const result = await blogModel.create({
    //         title:req.body.title,
    //         description:req.body.description,
    //         content:req.body.content
    //     })
    //     res.status(200).json({
    //         message:"Blog created successfuly.",
    //         blog:result
    //     })
    // } catch (error) {
    //     res.status(500).json({
    //         message:error
    //     })
    // }
}

const getBlogs = async(req,res)=>{
    try {
        const allBlogs = await blogModel.find({})
        res.status(200).json({
            message:"blogs retreived successfuly",
            blogs:allBlogs
        })
    } catch (error) {
        res.status(500).json({
            message:error
        })
    }
}

const getBlog = async(req,res)=>{
    try {
        let id = req.params.id;
        const blog = await blogModel.findById(id)
        res.status(200).json({
            message:"The blog retreived successfuly.",
            blog:blog
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

const updateBlog = async(req,res)=>{
    try {
        const updated = await blogModel.findByIdAndUpdate({_id:req.params.id},req.body)
        res.status(200).json({
            message:"Blog updated successfuly."
        })
    } catch (error) {
        res.status(500).json({
            message:error
        })
    }
}

const deleteBlog = async(req,res)=>{
    try {
        let id = req.params.id;
        await blogModel.findByIdAndRemove(id)
        res.status(200).json({
            message:"The blog is deleted successfuly."
        })
    } catch (error) {
        res.json({
            message:"There is an error deleting the blog."
        })
    }
}

export {createBlog,getBlogs,getBlog,updateBlog,deleteBlog}