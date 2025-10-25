import { Router } from "express";
import {
    createAnime,
    getAllAnime,
    getAnimeById,
    updateAnime,
    deleteAnime
} from "../controllers/animeControl";

const router = Router();

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

export default router;