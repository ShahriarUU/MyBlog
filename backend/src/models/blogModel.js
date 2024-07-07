import mongoose, { Schema } from "mongoose";

const blogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Blog title is require"]
    },
    description:
    {
        type: String,
        required: [true, "Blog description is require"]
    },
    category: {
        type: String,
        require: [true, "Blog category is require"]
    },

    thumbnail:
    {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },

    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },

    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },


})


export default mongoose.model("Blog", blogSchema);