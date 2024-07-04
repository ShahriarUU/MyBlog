import express from "express";
import { userSignUp, userLogIn } from "../controllers/userController.js";

const router = express.Router();


router.route("/signup").post(userSignUp);
router.route("/login").post(userLogIn);




export default router;