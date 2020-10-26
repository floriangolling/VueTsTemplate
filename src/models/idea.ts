import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

export default class Ideas extends Model {
public user!:string;
public text!:Text;
public title!:string;
public like!: number;

    static definition(sequelize: Sequelize) {
        Ideas.init(
            {
                user: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                text: {
                    type: DataTypes.TEXT,
                    allowNull: false
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                like: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                }
            }, {
                tableName: "ideas",
                sequelize: sequelize
            }
        );
    }
}