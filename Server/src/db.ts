import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import User from './models/User';
import Rating from './models/Rating';
import Rent from './models/Rent';
import Property from './models/Property';
import Service from './models/Service';

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


const { Users, Ratings, Rents, Properties, Services } = sequelize.models

Users.hasMany(Properties, { foreignKey: 'id_user' });
Properties.belongsTo(Users, { foreignKey: 'id_user' })




Services.belongsToMany(Properties, { through: 'Property_Services' });
Properties.belongsToMany(Services, { through: 'Property_Services' });

Users.hasMany(Properties, { foreignKey: 'id_usuario' });
Properties.belongsTo(Users, { foreignKey: 'id_usuario' });



export default sequelize;

