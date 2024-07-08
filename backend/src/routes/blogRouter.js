import express from "express";
import { verifyToken } from "../middelwares/authMiddelware.js";
import { createBlog, getBlog, updateBlog, deleteBlog, getAllComment, getAllBlogs } from "../controllers/blogControllers.js";

const router = express.Router();


router.route("/create").post(verifyToken, createBlog);
router.route("/getAllBlogs").get(verifyToken, getAllBlogs);
router.route("/:id").get(verifyToken, getBlog)
    .patch(verifyToken, updateBlog)
    .delete(verifyToken, deleteBlog);

router.route("/getAllComments/:id").get(verifyToken, getAllComment);
export default router;