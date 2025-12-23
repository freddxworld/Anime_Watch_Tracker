import { Request, Response } from "express";
import Anime from "../models/anime";
import { Op } from "sequelize";
import { sendError } from "../utils/errorHandler";

// create anime
export const createAnime = async (req: Request, res: Response) => {
    try {
        const newAnimeData = await Anime.create({
            ...req.body,
            userId: req.user!.id
        });
        res.status(201).json(newAnimeData);
    } catch (err: any) {
        console.error(err);
        return sendError(res, 400, "Error creating new anime");
    }
};

// find all anime
export const getAllAnime = async (req: Request, res: Response) => {
    try {
        const { title, status, sort = "createdAt", order = "DESC" } = req.query;
        const whereClause: any = { userId: req.user!.id }; // only anime belonging to logged-in user
        if (title) {
            whereClause.title = { [Op.like]: `%${title}%` };
        }
        if (status) {
            whereClause.status = status;
        }

        const animeList = await Anime.findAll({
            where: whereClause,
            order: [[String(sort), String(order).toUpperCase()]],
        });

        res.status(200).json(animeList);
    } catch (err: any) {
        console.error(err);
        return sendError(res, 500, "Failed to get anime list");
    }
};

// find single anime
export const getAnimeById = async (req: Request, res: Response) => {
    try {
        const anime = await Anime.findByPk(req.params.id);
        if (!anime) return sendError(res, 404, "Anime not found");
        if (anime.userId !== req.user!.id) return sendError(res, 403, "Not authorized to view this anime");

        res.status(200).json(anime);
    } catch (err: any) {
        console.error(err);
        return sendError(res, 400, "Error fetching anime");
    }
};

// update anime
export const updateAnime = async (req: Request, res: Response) => {
    try {
        const anime = await Anime.findByPk(req.params.id);
        if (!anime) return sendError(res, 404, "Anime not found");
        if (anime.userId !== req.user!.id) return sendError(res, 403, "Not authorized to update this anime");

        await anime.update(req.body);
        res.status(200).json(anime);
    } catch (err: any) {
        console.error(err);
        return sendError(res, 400, "Error updating anime");
    }
};

// delete anime
export const deleteAnime = async (req: Request, res: Response) => {
    try {
        const anime = await Anime.findByPk(req.params.id);
        if (!anime) return sendError(res, 404, "Anime not found");
        if (anime.userId !== req.user!.id) return sendError(res, 403, "Not authorized to delete this anime");

        await anime.destroy();
        res.status(204).send();
    } catch (err: any) {
        console.error(err);
        return sendError(res, 500, "Error deleting anime");
    }
};