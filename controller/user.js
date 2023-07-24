import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/featuers.js";
import ErrorHandler from "../middlewares/error.js";



export const login = async (req, res,next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) return next(new ErrorHandler("Incorrect User or Password", 400));

        const isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched) return next(new ErrorHandler("Incorrect User or Password", 400));

        sendCookie(user, res, `Welcome Back ${user.name}`);
    } catch (error) {
        next(error);
    }
};

export const register = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });


        if (user) return next(new ErrorHandler("User Already Exits", 400));

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({ name, email, password: hashedPassword });

        sendCookie(user, res, "Registerd Successfully", 201);

    } catch (error) {
        next(error);
    }
};

export const logout = (req, res) => {
    const { token } = req.cookies;

    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        sameStie: process.env.NODE_ENV === Development ? "lax" : "none",
        secure: process.env.NODE_ENV === Development ? false : true
    }).json({
        success: true
    });
};

export const getMyProfile = (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user
    });

};