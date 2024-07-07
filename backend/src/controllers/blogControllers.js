import Blog from "../models/blogModel.js";
import asyncErrorHandle from "../utils/asyncErrorHandle.js";
import customError from "../utils/customError.js";


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

    if (!currentBlog) {
        return next(new customError("Blog are not exist", 400));
    }

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

export const updateBlog = asyncErrorHandle(async (req, res, next) => {

    const { title, description, category } = req.body

    const currentBlog = await Blog.findById(req.params.id);

    if (currentBlog) {
        currentBlog.title = title || currentBlog.title;
        currentBlog.description = description || currentBlog.description;
        currentBlog.category = category || currentBlog.category;
    }
    const updateBlog = await currentBlog.save();
    res.status(200).json({
        status: 'sucess',
        data: {
            Blog: updateBlog
        }
    })

});

export const deleteBlog = asyncErrorHandle(async (req, res, next) => {

    const currentBlog = await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
        status: "sucess",
        message: "delete successfully",
        data: {
            blog: currentBlog
        }
    })
});

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


