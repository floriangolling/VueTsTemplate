import Umzug from 'umzug';
import { postgres } from './postgres'
import {Sequelize} from 'sequelize';
import Path from 'path';
import fs from 'fs';

let umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
        sequelize : postgres
    },
    migrations: {
        params: [
            postgres.getQueryInterface(),
            Sequelize
        ],
        path: Path.join(__dirname, 'migrations'),
        pattern: /\.js$/
    }
})

function createFile(name: string) {
    fs.writeFile("./src/database/migrations/" + get_date() + "-" + name + ".ts",
    `import DataTypes, { QueryInterface, Sequelize } from 'sequelize'

export default {
    up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
        // Put your modifications here.
    },
    down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
        // Delete your modifications here.
    }
}`, function(err) {
        if (err)
            return console.log('\x1b[31m%s\x1b[0m', err);
    });
    console.log('\x1b[32m%s\x1b[0m', name + "File has been successfully created in migrations folder !");
}

function zeroAdder(n: number) {
    return n < 10 ? '0' + n : n
}

function get_date() {
    var date = new Date();

    let dateN = date.getFullYear().toString() + zeroAdder(date.getMonth() + 1) + zeroAdder( date.getDate()) + zeroAdder( date.getHours() ) + zeroAdder( date.getMinutes() ) + zeroAdder( date.getSeconds());
    return (dateN.toString());
}

async function up() {
    try {
        await umzug.up();
        console.log('\x1b[32m%s\x1b[0m', 'You have sync to the last(s) migration(s) successfully.');

    } catch (err) {
        console.log('\x1b[31m%s\x1b[0m', 'An error as happened during updating the migration \n error : \n');
        console.log(err);
    }
}

async function down(){
    try {
        await umzug.down();
        console.log('\x1b[32m%s\x1b[0m', 'You have been reverted to the last migration successfully.');
    } catch (err) {
        console.log('\x1b[31m%s\x1b[0m', 'An error as happened during the reverting migration \n error : \n');
        console.log(err);
    }
}

if (process.argv[2] === "up") {
    up();
}

if (process.argv[2] === "down") {
    down();
}

if (process.argv[2] === "create" && process.argv[3] != undefined && process.argv[3] != null && process.argv[3] != "") {
    createFile(process.argv[3]);
}

if (process.argv[2] === "create" && (process.argv[3] == undefined || process.argv[3] == null || process.argv[3] == "")) {
    console.log('\x1b[31m%s\x1b[0m', 'Please enter a name to create your new migration.. \n example : npm run db:create new_migration');
}