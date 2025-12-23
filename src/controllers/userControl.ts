import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { sendError } from "../utils/errorHandler";
import { send } from "node:process";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password} = req.body;

         // check if username exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser){
            return sendError(res, 400, "Email already registered")
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // create user
        const newUser = await User.create({
            username,
            email,
            passwordHash
        });

        res.status(201).json({
            message: "User registerd succesfully",
            user: {id: newUser.id, username: newUser.username, email: newUser.email},
        });
    } catch (err: any) {
        console.error(err);
        return sendError(res, 500, "Server error registering user");
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;

        // find user
        const user = await User.findOne({ where: {email}});
        if(!user){
            return sendError(res, 400, "no user found")
        }
        // check password
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if(!isMatch){
            return sendError(res, 400, "incorrect password")
        }

        // sign in token
        const token = jwt.sign(
            {id: user.id, username: user.username, email: user.email},
            JWT_SECRET,
            {expiresIn: "1h"}
        );

        res.status(200).json({
            message: "login succesful",
            token,
            user: {id: user.id, username: user.username, email: user.email},
        });
    } catch (err){
        console.error(err);
        return sendError(res, 500, "server error logging in")
    }
};
export default{
    registerUser,
    loginUser,
};