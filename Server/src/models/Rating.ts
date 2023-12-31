
import { DataTypes, Model, Sequelize } from 'sequelize';
import { RatingAttributes } from './Interfaces';

interface UserInstance extends Model<RatingAttributes>, RatingAttributes { }

const Rating = (sequelize: Sequelize) => {
    sequelize.define<UserInstance>('Ratings', {

        rating_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        total_rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cleaning_rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        communication_rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price_quality_rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        veracity_rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description_rating: {
            type: DataTypes.STRING,
            allowNull: true
        },
        date_rating: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }
    )
}

export default Rating  