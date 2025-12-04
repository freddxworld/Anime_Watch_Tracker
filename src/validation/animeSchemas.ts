import {z} from  "zod";

export const createAnimeSchema = z.object({
    title: z.string().min(1, "Title is required"),
    episodesWatched: z.number().int().nonnegative(),
    totalEpisodes: z.number().int().positive(),
    status: z.enum(["watching", "completed", "planned"]),
});