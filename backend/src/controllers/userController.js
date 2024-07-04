import User from "../models/userModel.js";
import customError from "../utils/customError.js";
import asyncErrorHandle from "../utils/asyncErrorHandle.js";




export const userSignUp = asyncErrorHandle(async (req, res, next) => {

    const newUser = await User.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            user: newUser
        }
    })
});


export const userLogIn = asyncErrorHandle(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new customError("All fileds are required", 400));
    }

    const currentUser = await User.findOne({ email });

    if (!currentUser) {
        return next(new customError("credentials are not match", 400));
    }

    const isPasswordValid = await currentUser.isPasswordCorrect(password);

    if (!isPasswordValid) {
        return next(new customError("credentials are not match", 400));
    }

    const accessToken = await currentUser.generateAccessToken();

    //set cookies
    const options = {
        httpOnly: true,
        secure: true,
    };

    res.status(201)
        .cookie("accessToken", accessToken, options)
        .json({
            status: "success",
            data: {
                user: currentUser,
                Token: accessToken,
            },
        });

})

