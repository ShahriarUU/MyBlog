import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema({

    content: {
        type: String,
        require: true
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export default mongoose.model("Comment", commentSchema);