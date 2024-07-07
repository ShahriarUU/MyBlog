import express from "express";
import { verifyToken } from "../middelwares/authMiddelware.js";
import { createComment, deleteComment, readComment, updateComment } from "../controllers/commentController.js";


const router = express.Router();


router.route("/:id").post(verifyToken, createComment)
    .patch(verifyToken, updateComment)
    .get(verifyToken, readComment)
    .delete(verifyToken, deleteComment);


export default router;