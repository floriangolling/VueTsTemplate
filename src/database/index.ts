import { Sequelize } from 'sequelize/types';
export async function init(postgres: Sequelize) {
    try {
        await postgres.authenticate();
        console.log('Connection has been established succesfully.');
    } catch (e) {
        console.log('Unable to connect to the database: \n');
        console.log('\x1b[31m%s\x1b[0m', e);
        throw e;
    }
}