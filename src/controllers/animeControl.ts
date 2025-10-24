import { Request, Response } from "express";
import Anime from "../models/anime";
import { EmptyResultError } from "sequelize";

// create anime
export const createAnime = async (req: Request, res: Response) => {
    try{
        const newAnimeData = await Anime.create(req.body);
        res.status(201).json(newAnimeData);
    } catch (error){
        res.status(400).json({message: "Error creating new anime", error});
    };
}
// find all anime
export const getAllAnime = async (req: Request, res: Response) => {
    try{
        const allAnime = await Anime.findAll(); 
        res.status(200).json(allAnime)
    } catch (error){
        res.status(500).json({message: "Failed with getting anime list", error});
    };
} 
// find single anime
export const getAnimeById = async (req : Request, res: Response) => {
    try {
        const anime = await Anime.findByPk(req.params.id);
        if(!anime) return res.status(404).json({message: "anime not found"});
        res.status(200).json
    } catch (error){
        res.status(400).json({message: "error with fetching anime"});
    }
};

// update anime
export const updateAnime = async (req: Request, res: Response) => {
    try{
        const anime = await Anime.findByPk(req.params.id);
        if (!anime) return res.status(404).json({message: "anime not found"});
        await anime.update(req.body);
        res.status(200).json(anime);
    } catch (error){
        res.status(400).json({message: "error updating anime", error
        });
    }
};

// deletet anime
export const deleteAnime = async (req: Request, res: Response) => {
    try{
        const anime = await Anime.findByPk(req.params.id);
        if (!anime) return res.status(404).json({message: "anime not found"});

        await anime.destroy();
        res.status(204).send();
    } catch (error){
        res.status(500).json({message : "error deleting anime", error});
    }
};