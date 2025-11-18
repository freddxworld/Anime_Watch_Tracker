import sequelize from "../database/connection";
import { DataType, DataTypes, Model } from "sequelize";
import User from "./user";

class Anime extends Model {
    public id!: number;
    public title!: string;
    public episodes!: number;
    public status!: string;
    public userId!: Number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
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
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: User, key: "id"},
    },
 },
 {
    sequelize,
    modelName: "Anime",
    tableName: "animes",
    timestamps: true,
 }
);
Anime.belongsTo(User, {foreignKey: "userId"});

export default Anime;