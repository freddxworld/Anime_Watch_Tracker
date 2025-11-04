import sequelize from "../database/connection";
import { DataTypes, Model, Optional} from "sequelize";

interface UserAttributes {
    id: number;
    username: string;
    email: string;
    passwordHash: string;
}
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes{
    public id!: number;
    public username!: string;
    public email!: string;
    public passwordHash!: string;
    
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username:{
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {isEmail: true},
    },
    passwordHash:{
        type: DataTypes.STRING,
        allowNull: false,
    },
},
{
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
}
);

export default User;