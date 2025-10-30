import express from "express";
import animeRoutes from "./routes/animeRoutes";

const app = express();
app.use(express.json());

//optional simple health check
app.get("/", (req, res) => res.send("API running"));

//mount anime router
// will make any anime routes be defined with /api/anime
app.use("/api/anime", animeRoutes);

//handles any middle ware errors
app.use((err: any, req: any, res: any, next: any) => {
    console.error(err);
    res.status(err.status || 500).json({message: err.message || "internal server error"})
});

export default app;