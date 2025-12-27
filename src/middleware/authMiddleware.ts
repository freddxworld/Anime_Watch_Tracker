import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { sendError } from "../utils/errorHandler";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return sendError(res, 401, "Access denied no token provided")
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {id: number; username: string; email: string};
        req.user = decoded;
        next();
    } catch (err) {
        return sendError(res, 403, "Invalid or expired auth token")
    }
};