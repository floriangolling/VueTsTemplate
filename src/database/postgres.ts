import { Sequelize, Model } from 'sequelize';
import Config from '../config';
import * as Models from '../models';

export const postgres = new Sequelize(Config.database, Config.username, Config.password, {
    host: Config.host,
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});

for(let model of Object.values(Models)) {
    model.definition(postgres);
}