import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "name is required"],
    },

    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        validate: [validator.isEmail, "Invalid email address"]

    },
    password: {
        type: String,
        require: [true, "password are required"],
    },
    confirmPassword: {
        type: String,
        require: [true, "confirm Password is required"],
        validate: {
            //this validator only work save() and create() method
            validator: function (val) {
                return val == this.password
            },
            message: 'password and confirm password not match!'
        }
    },
    role:
    {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],

    },
    profileAvatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    coverAvatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },



}, { timestamps: true });




//password encoded using bcrypt

userSchema.pre('save', async function (next) {

    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = undefined;
    next();
})


//compare  password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

//Generate Access Token 

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }

    )
}

//

export default mongoose.model("User", userSchema);