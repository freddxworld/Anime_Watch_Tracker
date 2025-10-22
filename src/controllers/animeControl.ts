import { Request, Response } from "express";
import Anime from "../models/anime";
import { EmptyResultError } from "sequelize";

export const createAnime = async (req: Request, res: Response) => {
    try{
        const newAnimeData = await Anime.create(req.body);
        res.status(201).json(newAnimeData);
    } catch (error){
        res.status(400).json({message: "Error creating new anime", error});
    };
}
export const getAllAnime = async (req: Request, res: Response) => {
    try{
        const allAnime = await Anime.findAll(); 
        res.status(200).json(allAnime)
    } catch (error){
        res.status(500).json({message: "Failed with getting anime list", error});
    };
} 