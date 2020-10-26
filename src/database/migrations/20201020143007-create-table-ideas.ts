import DataTypes, { QueryInterface, Sequelize } from 'sequelize'

export default {
    up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
        await queryInterface.createTable('ideas', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
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
                type:DataTypes.INTEGER,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            }
        })
    },
    down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
        await queryInterface.dropTable('ideas');
    }
}