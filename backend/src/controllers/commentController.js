import asyncErrorHandle from "../utils/asyncErrorHandle.js"
import customError from "../utils/customError.js";
import Comment from "../models/commentModel.js";

export const createComment = asyncErrorHandle(async (req, res, next) => {

    const currentComment = await Comment.create(req.body);

    currentComment.user = req.user?._id;
    currentComment.blog = req.params.id;
    await currentComment.save();

    res.status(200).json({
        status: "sucess",
        data: {
            comment: currentComment
        }
    })


});

export const updateComment = asyncErrorHandle(async (req, res, next) => {

    const currentComment = await Comment.findById(req.params.id);

    currentComment.content = req.body.content;

    await currentComment.save();

    res.status(200).json({
        status: "sucess",
        data: {
            comment: currentComment
        }
    })
})

export const readComment = asyncErrorHandle(async (req, res, next) => {

    const currentComment = await Comment.findById(req.params.id);

    if (!currentComment) {
        return next(new customError("Comment are not exist", 400));
    }

    console.log(currentComment);
    res.status(200).json({
        status: "sucess",
        data: {
            comment: currentComment
        }
    })
})


export const deleteComment = asyncErrorHandle(async (req, res, next) => {
    const currentComment = await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status: "sucess",
        data: {
            comment: currentComment
        }
    })

})