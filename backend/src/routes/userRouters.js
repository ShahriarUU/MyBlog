import express from "express";
import { userSignUp, userLogIn, userLogout, userProfile, userPasswordUpdate } from "../controllers/userController.js";
import { verifyToken } from "../middelwares/authMiddelware.js";

const router = express.Router();


router.route("/signup").post(userSignUp);
router.route("/login").post(userLogIn);


//protected Routes
router.route("/logout").get(verifyToken, userLogout);
router.route("/profile").get(verifyToken, userProfile);
router.route("/changePassword").patch(verifyToken, userPasswordUpdate);

export default router;