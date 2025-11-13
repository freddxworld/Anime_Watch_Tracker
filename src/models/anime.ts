import sequelize from "../database/connection";
import { DataType, DataTypes, Model } from "sequelize";

class Anime extends Model {
    public id!: number;
    public title!: string;
    public episodes!: number;
    public status!: string;
}
Anime.init(
 {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    episodes: {
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "watching",
    },
 },
 {
    sequelize,
    modelName: "Anime",
    tableName: "animes",
    timestamps: true,
 }
);

export default Anime;