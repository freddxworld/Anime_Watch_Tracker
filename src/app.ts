import express, { Request, Response, NextFunction } from "express";
import animeRoutes from "./routes/animeRoutes";
import userRoutes from "./routes/userRoutes";
import { sendError } from "./utils/errorHandler";

const app = express();
app.use(express.json());

// optional simple health check
app.get("/", (req, res) => res.send("API running"));

// mount anime router
app.use("/api/anime", animeRoutes);
// mount user routes
app.use("/api/users", userRoutes);

// centralized error handler for all middleware errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    // Use sendError to standardize response
    return sendError(
        res,
        err.status || 500,
        err.message || "Internal server error"
    );
});

export default app;