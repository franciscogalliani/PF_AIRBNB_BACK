import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import User from './models/User';
import Rating from './models/Rating';
import Rent from './models/Rent';


dotenv.config();
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize: Sequelize = new Sequelize(`${DB_USER}://postgres:${DB_PASSWORD}@${DB_HOST}:7823/railway`, {
    logging: false,
    native: false
});

User(sequelize)
Rating(sequelize)
Rent(sequelize);


export default sequelize;

// test

// Test

