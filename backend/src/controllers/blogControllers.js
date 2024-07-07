import Blog from "../models/blogModel.js";
import asyncErrorHandle from "../utils/asyncErrorHandle.js";


export const createBlog = asyncErrorHandle(async (req, res, next) => {

    const blog = await Blog.create(req.body);

    blog.user = req.user?._id;

    const newBlog = await blog.save();

    res.status(201).json({
        status: 'success',
        data: {
            Blog: newBlog
        }
    })
});

export const getBlog = asyncErrorHandle(async (req, res, next) => {

    const currentBlog = await Blog.findById(req.params.id).populate({
        path: 'user',
        select: ["-password"]
    });

    res.status(200).json(
        {
            status: 'success',
            data:
            {
                Blog: currentBlog
            }
        }
    )
})

export const getAllBlogs = asyncErrorHandle(async (req, res, next) => {

    const Blogs = await Blog.find().populate({
        path: 'user',
        select: ["-password"]
    });
    res.status(200).json({
        status: 'success',
        data: {
            Blogs: Blogs
        }
    })

});



