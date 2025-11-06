import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password} = req.body;

         // check if username exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser){
        return res.status(400).json({message: "Email already registered"});
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
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Server error registering user"});
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;

        // find user
        const user = await User.findOne({ where: {email}});
        if(!user){
            return res.status(400).json({message: "invalid credentials"});
        }
        // check password
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if(!isMatch){
            return res.status(400).json({message: "invalid credentials"});
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
        res.status(500).json({message: "server error logging in"});
    }
};
export default{
    registerUser,
    loginUser,
};