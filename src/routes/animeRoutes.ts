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
//post /anime --> create a new anime
router.post("/", createAnime);

//get /anime --> get all anime
router.get("/", getAllAnime);

//get /anime by it --> get one anime by id
router.get("/:id", getAnimeById);

//put /anime by id --> update anime by id
router.put("/:id", updateAnime);

//delete /anime by id --> delete anime by id
router.delete("/:id", deleteAnime);

// Protected routes
router.post("/", authenticateToken, createAnime);
router.put("/:id", authenticateToken, updateAnime);
router.delete("/:id", authenticateToken, deleteAnime);

export default router;