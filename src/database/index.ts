import {Sequelize} from "sequelize";

export const database  = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'transformatec_development',
    username: 'transformatec',
    password: 'transformatec',
    define: {
        underscored: true
    }
})