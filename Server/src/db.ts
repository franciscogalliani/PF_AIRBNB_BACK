import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize: Sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/arbnb`, {
    logging: false,
    native: false
});

export default sequelize;

// test

// Test

