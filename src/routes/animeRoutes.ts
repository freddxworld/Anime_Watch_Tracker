import { Router } from "express";
import {
    createAnime,
    getAllAnime,
    getAnimeById,
    updateAnime,
    deleteAnime
} from "../controllers/animeControl";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();
// public routes
//get /anime --> get all anime
router.get("/", getAllAnime);
//get /anime by it --> get one anime by id
router.get("/:id", getAnimeById);

// Protected routes
router.post("/", authenticateToken, createAnime);   // Create new anime
router.put("/:id", authenticateToken, updateAnime); // Edit anime
router.delete("/:id", authenticateToken, deleteAnime); // Delete anime

export default router;