import User from "../models/userModel.js";
import customError from "../utils/customError.js";
import asyncErrorHandle from "../utils/asyncErrorHandle.js";




export const userSignUp = asyncErrorHandle(async (req, res, next) => {

    const newUser = await User.create(req.body);

    newUser.password = undefined;

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

    currentUser.password = undefined;
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

export const userLogout = asyncErrorHandle(async (req, res, next) => {

    const options = {
        httpOnly: true,
        secure: true,
    }

    res.status(200).clearCookie('accessToken', options).json({
        status: "success",
        message: "Logout successfully",
    });

})

export const userProfile = asyncErrorHandle(async (req, res, next) => {

    const currentUser = req.user;
    res.status(200).json({
        status: 'sucess',
        data: {
            user: currentUser
        }
    })
})

export const userPasswordUpdate = asyncErrorHandle(async (req, res, next) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const currentUser = await User.findById(req.user?._id);
    const isPasswordCorrect = await currentUser.isPasswordCorrect(currentPassword);

    if (!isPasswordCorrect) {
        next(new customError("your Current Password incorrect"));
    }

    currentUser.password = newPassword;

    const updateUser = await currentUser.save();
    updateUser.password = undefined;

    res.status(200).json({
        status: 'success',
        data: {
            user: updateUser
        }
    })


})
