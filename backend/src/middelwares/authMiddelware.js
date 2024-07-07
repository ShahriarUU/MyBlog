import jwt from "jsonwebtoken";
import asyncErrorHandle from "../utils/asyncErrorHandle.js";
import customError from "../utils/customError.js";
import User from "../models/userModel.js";

export const verifyToken = asyncErrorHandle(async (req, res, next) => {

    try {
        const token = req.cookies?.accessToken || req.header('Authorization').replace('bearer', "");

        if (!token) {
            return next(new customError('UnAuthorized Request'), 401);
        }

        const tokenDecode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(tokenDecode?._id).select("-password");

        if (!user) {
            return next(new customError("Invalid Access Token", 401));

        }

        req.user = user;
        next();
    }
    catch (error) {
        next(error);
    }

})
