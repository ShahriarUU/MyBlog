import express from "express";
import { userSignUp, userLogIn, userLogout, userProfile, userPasswordUpdate, getAllBlogs, userProfileUpdate, deleteUser } from "../controllers/userController.js";
import { verifyToken, restrict } from "../middelwares/authMiddelware.js";

const router = express.Router();


router.route("/signup").post(userSignUp);
router.route("/login").post(userLogIn);


//protected Routes
router.route("/logout").get(verifyToken, userLogout);
router.route("/profile").get(verifyToken, userProfile);
router.route("/changePassword").patch(verifyToken, restrict('user'), userPasswordUpdate);
router.route("/getAllBlogs").get(verifyToken, getAllBlogs);
router.route("/userProfileUpdate").patch(verifyToken, restrict('user'), userProfileUpdate);
router.route("/deleteUser/:id").delete(verifyToken, restrict('admin'), deleteUser)
export default router;