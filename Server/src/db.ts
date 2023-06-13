import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import User from './models/User';
import Rating from './models/Rating';
import Rent from './models/Rent';
import Property from './models/Property';
import Service from './models/Service';
//Comentario de prueba
// demo 123445435435435435

dotenv.config();
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// const sequelize: Sequelize = new Sequelize(`${DB_USER}://postgres:${DB_PASSWORD}@${DB_HOST}:7823/railway`

const sequelize: Sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/arbnb`, {
    logging: false,
    native: false
});


User(sequelize)
Rating(sequelize)
Rent(sequelize);
Property(sequelize);
Service(sequelize);

const { Properties, Ratings, Rents, Services, Users } = sequelize.models;

export default sequelize;

// test

// Test

