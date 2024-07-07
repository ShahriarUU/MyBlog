import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouters.js";
import commentRouter from "./routes/commentRouter.js";
import blogRouter from "./routes/blogRouter.js";
import globleErrorController from "./controllers/globleErrorController.js";
import customError from "./utils/customError.js";

const app = express();

// active all  middelwares

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())




//all routes

app.use("/api/v1/user", userRouter);

app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/comment", commentRouter);


//catch undefin routers

app.use("*", (req, res, next) => {

    next(new customError(`can't find ${req.originalUrl} on the Server`, 404));
})


//active globle error handler
app.use(globleErrorController);

export default app;


