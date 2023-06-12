import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import User from './models/User';
import Property from './models/Property';
import Service from './models/Service';

dotenv.config();
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize: Sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/arbnb`, {
    logging: false,
    native: false
});

User(sequelize);
Property(sequelize);
Service(sequelize);

export default sequelize;

// test

// Test

